-- XYZ Layers: storefront, orders, custom requests, contact messages and admin access.
--
-- Run this once in the Supabase SQL editor (or `supabase db push`). It is idempotent, so
-- it is safe to re-run. It works with an existing `products` table: it only adds the
-- columns that are missing and never drops or rewrites your data.
--
-- It expects the orders, order_items, custom_requests, contact_messages and admins tables
-- not to exist yet (they are new). It will also remove any other policy on `products`.
--
-- AFTER running it, make yourself an admin (see the bottom of this file). Until you do,
-- nobody can write to products or read orders from the admin panel.

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Daily Essentials',
  price numeric(10, 2) not null default 0,
  stock integer not null default 0,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.products
  add column if not exists category text not null default 'Daily Essentials',
  add column if not exists stock integer not null default 0,
  add column if not exists description text,
  add column if not exists status text not null default 'active',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists compare_at_price numeric(10, 2),
  add column if not exists image_url text,
  add column if not exists gallery_urls text[] not null default '{}',
  add column if not exists featured_image_url text,
  add column if not exists specs text,
  add column if not exists featured boolean not null default false,
  add column if not exists trending boolean not null default false,
  add column if not exists visibility text not null default 'public';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'products_visibility_check'
  ) then
    alter table public.products
      add constraint products_visibility_check check (visibility in ('public', 'hidden'));
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Admin allowlist
--
-- Supabase lets anyone sign up by default, so "is logged in" must never mean "is admin".
-- Admins are the users listed here.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity (start with 1001),
  customer_name text not null,
  email text not null,
  phone text not null,
  address_line text not null,
  city text not null,
  state text not null,
  pincode text not null,
  notes text,
  subtotal numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  -- text, with no foreign key: it survives product deletion and any products.id type.
  product_id text not null,
  product_name text not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null check (quantity > 0),
  color text,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- ---------------------------------------------------------------------------
-- Custom order requests and contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.custom_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity (start with 1001),
  name text not null,
  email text not null,
  phone text not null,
  project_title text not null,
  description text not null,
  budget text,
  deadline date,
  file_paths text[] not null default '{}',
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'quoted', 'approved', 'printing', 'completed')),
  quotation_amount numeric(10, 2),
  internal_notes text,
  created_at timestamptz not null default now()
);

create index if not exists custom_requests_created_at_idx on public.custom_requests (created_at desc);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- ---------------------------------------------------------------------------
-- place_order: the only way a customer creates an order.
--
-- Prices come from the products table, never from the browser, so a customer cannot
-- tamper with what they pay. Stock is checked and decremented in the same transaction.
-- ---------------------------------------------------------------------------
create or replace function public.place_order(customer jsonb, items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_number bigint;
  v_subtotal numeric(10, 2) := 0;
  v_lines jsonb := '[]'::jsonb;
  v_item jsonb;
  v_qty integer;
  v_product record;
  v_field text;
begin
  if customer is null or jsonb_typeof(customer) <> 'object' then
    raise exception 'Missing customer details';
  end if;

  foreach v_field in array array['name', 'email', 'phone', 'address_line', 'city', 'state', 'pincode'] loop
    if coalesce(btrim(customer ->> v_field), '') = '' then
      raise exception 'Missing required field: %', v_field;
    end if;
  end loop;

  if items is null or jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then
    raise exception 'Your cart is empty';
  end if;

  if jsonb_array_length(items) > 50 then
    raise exception 'Too many items in one order';
  end if;

  -- Pass 1: validate, price and reserve stock for every line. Nothing is inserted yet, so
  -- a rejected order (sold out, hidden product, bad quantity) never uses up an order number.
  for v_item in select * from jsonb_array_elements(items) loop
    begin
      v_qty := (v_item ->> 'quantity')::integer;
    exception when others then
      v_qty := null;
    end;

    if v_qty is null or v_qty < 1 or v_qty > 99 then
      raise exception 'Invalid quantity';
    end if;

    select p.id, p.name, p.price, p.stock
      into v_product
      from public.products p
     where p.id::text = (v_item ->> 'product_id')
       and coalesce(p.status, 'active') = 'active'
       and p.visibility = 'public'
       for update;

    if not found then
      raise exception 'One of the products in your cart is no longer available';
    end if;

    if v_product.stock < v_qty then
      raise exception 'Only % left in stock for %', v_product.stock, v_product.name;
    end if;

    update public.products set stock = stock - v_qty where id = v_product.id;

    v_lines := v_lines || jsonb_build_object(
      'product_id', v_product.id::text,
      'product_name', v_product.name,
      'unit_price', v_product.price,
      'quantity', v_qty,
      'color', nullif(btrim(coalesce(v_item ->> 'color', '')), '')
    );
    v_subtotal := v_subtotal + v_product.price * v_qty;
  end loop;

  -- Pass 2: everything checked out, so create the order. If anything below fails, the whole
  -- transaction (including the stock reservation above) is rolled back.
  insert into public.orders (customer_name, email, phone, address_line, city, state, pincode, notes, subtotal, total)
  values (
    btrim(customer ->> 'name'),
    btrim(customer ->> 'email'),
    btrim(customer ->> 'phone'),
    btrim(customer ->> 'address_line'),
    btrim(customer ->> 'city'),
    btrim(customer ->> 'state'),
    btrim(customer ->> 'pincode'),
    nullif(btrim(coalesce(customer ->> 'notes', '')), ''),
    v_subtotal,
    v_subtotal
  )
  returning id, order_number into v_order_id, v_order_number;

  insert into public.order_items (order_id, product_id, product_name, unit_price, quantity, color)
  select v_order_id, l.product_id, l.product_name, l.unit_price, l.quantity, l.color
    from jsonb_to_recordset(v_lines)
      as l(product_id text, product_name text, unit_price numeric, quantity integer, color text);

  return jsonb_build_object('id', v_order_id, 'order_number', v_order_number, 'total', v_subtotal);
end;
$$;

revoke all on function public.place_order(jsonb, jsonb) from public;
grant execute on function public.place_order(jsonb, jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.admins enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.custom_requests enable row level security;
alter table public.contact_messages enable row level security;

-- Customers only ever reach these tables through place_order(). Revoking the privileges
-- (not just relying on RLS) also stops a direct insert attempt from burning order numbers.
revoke all on public.orders from anon;
revoke all on public.order_items from anon;
revoke all on public.admins from anon;

-- Table privileges. Supabase normally grants these automatically, but being explicit keeps the
-- store working if that default ever changes. Row level security (below) still decides which
-- rows each role can actually see or change.
grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.admins to authenticated;
grant select, insert, update, delete on public.orders, public.order_items to authenticated;
grant insert on public.custom_requests, public.contact_messages to anon;
grant select, insert, update, delete on public.custom_requests, public.contact_messages to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Public can read visible products" on public.products;
create policy "Public can read visible products" on public.products
  for select to anon, authenticated
  using (visibility = 'public' and coalesce(status, 'active') = 'active');

drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Drop any older, more permissive policies on products, for example an "allow all" policy
-- added so the admin form could write with the public anon key. Policies are OR-ed together,
-- so a leftover one would silently defeat the two policies above.
do $$
declare
  p record;
begin
  for p in
    select policyname from pg_policies
     where schemaname = 'public' and tablename = 'products'
       and policyname not in ('Public can read visible products', 'Admins manage products')
  loop
    execute format('drop policy %I on public.products', p.policyname);
  end loop;
end $$;

drop policy if exists "Users can see their own admin row" on public.admins;
create policy "Users can see their own admin row" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "Admins manage orders" on public.orders;
create policy "Admins manage orders" on public.orders
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins manage order items" on public.order_items;
create policy "Admins manage order items" on public.order_items
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Customers may submit a request, but only as a brand new one: they cannot set the
-- admin-only fields (priority, status, quotation, notes).
drop policy if exists "Anyone can submit a custom request" on public.custom_requests;
create policy "Anyone can submit a custom request" on public.custom_requests
  for insert to anon, authenticated
  with check (
    status = 'new'
    and priority = 'medium'
    and quotation_amount is null
    and internal_notes is null
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(phone) between 3 and 40
    and char_length(project_title) between 1 and 200
    and char_length(description) between 1 and 5000
    and cardinality(file_paths) <= 10
  );

drop policy if exists "Admins manage custom requests" on public.custom_requests;
create policy "Admins manage custom requests" on public.custom_requests
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Anyone can send a contact message" on public.contact_messages;
create policy "Anyone can send a contact message" on public.contact_messages
  for insert to anon, authenticated
  with check (
    handled = false
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(message) between 1 and 5000
  );

drop policy if exists "Admins manage contact messages" on public.contact_messages;
create policy "Admins manage contact messages" on public.contact_messages
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage
--   product-images       public bucket, only admins can upload or delete
--   custom-request-files private bucket, customers can upload, only admins can read
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images', 'product-images', true, 10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'custom-request-files', 'custom-request-files', false, 10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins manage product images" on storage.objects;
create policy "Admins manage product images" on storage.objects
  for all to authenticated
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Anyone can upload custom request files" on storage.objects;
create policy "Anyone can upload custom request files" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'custom-request-files');

drop policy if exists "Admins read custom request files" on storage.objects;
create policy "Admins read custom request files" on storage.objects
  for select to authenticated
  using (bucket_id = 'custom-request-files' and public.is_admin());

drop policy if exists "Admins delete custom request files" on storage.objects;
create policy "Admins delete custom request files" on storage.objects
  for delete to authenticated
  using (bucket_id = 'custom-request-files' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Make yourself an admin.
--
-- 1. Supabase dashboard -> Authentication -> Users -> Add user (email + password).
-- 2. Run the statement below with that email, then sign in at /admin/login.
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'you@example.com'
--   on conflict do nothing;
--
-- Optional but recommended: Authentication -> Providers -> Email -> turn off
-- "Allow new users to sign up", so only users you create can ever log in.
-- ---------------------------------------------------------------------------
