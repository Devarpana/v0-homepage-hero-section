-- Locks the admin panel to signed-in admins.
--
-- BEFORE running this: create your admin account in Supabase
--   Authentication -> Users -> Add user -> Create new user (email + password, tick "Auto Confirm User").
-- Then run this once: SQL Editor -> New query -> paste -> Run.
--
-- It makes that account the admin, and from then on only admins can add, edit or delete
-- products and product photos, or read quote requests. Visitors can still see products and
-- send quote requests. If anything fails, nothing is changed.

-- 1. Admin list. Anyone can create a Supabase account, so "signed in" must never mean "admin".
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon;
grant select on public.admins to authenticated;

drop policy if exists "Admins can see their own row" on public.admins;
create policy "Admins can see their own row" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- 2. Make the one account you created the admin. Stops here if there isn't exactly one.
do $$
declare
  user_count int;
begin
  select count(*) into user_count from auth.users;
  if (select count(*) from public.admins) = 0 then
    if user_count = 0 then
      raise exception 'No account found. Create your admin user first: Authentication -> Users -> Add user.';
    elsif user_count > 1 then
      raise exception 'More than one account exists, so it is unclear which is the admin. Ask Claude for help.';
    end if;
    insert into public.admins (user_id, email) select id, email from auth.users;
  end if;
end $$;

-- 3. Products: everyone can read, only admins can change.
drop policy if exists "Public can insert products" on public.products;
drop policy if exists "Public can update products" on public.products;
drop policy if exists "Public can delete products" on public.products;
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 4. Product photo records.
drop policy if exists "Product images: admin can add" on public.product_images;
drop policy if exists "Product images: admin can delete" on public.product_images;
drop policy if exists "Admins manage product images" on public.product_images;
create policy "Admins manage product images" on public.product_images
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 5. Product photo files in the "products" bucket (reading stays public).
drop policy if exists "Product images: public upload" on storage.objects;
drop policy if exists "Product images: public delete" on storage.objects;
drop policy if exists "Admins manage product photo files" on storage.objects;
create policy "Admins manage product photo files" on storage.objects
  for all to authenticated
  using (bucket_id = 'products' and public.is_admin())
  with check (bucket_id = 'products' and public.is_admin());

-- 6. Quote requests: visitors can still send them (005), only admins can read and update them.
drop policy if exists "Admins manage quote requests" on public.custom_requests;
create policy "Admins manage quote requests" on public.custom_requests
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can read quote files" on storage.objects;
create policy "Admins can read quote files" on storage.objects
  for select to authenticated
  using (bucket_id = 'custom-orders' and public.is_admin());
