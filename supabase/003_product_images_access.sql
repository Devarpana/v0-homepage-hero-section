-- Lets the admin panel save photo records in product_images, and the website read them.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run more than once.
--
-- NOTE: until the admin login is added, writes are allowed with the site's public key.
-- When we add the login we will limit insert/delete to logged-in admins only.

alter table public.product_images enable row level security;

drop policy if exists "Product images: anyone can read" on public.product_images;
create policy "Product images: anyone can read"
  on public.product_images for select
  to anon, authenticated
  using (true);

drop policy if exists "Product images: admin can add" on public.product_images;
create policy "Product images: admin can add"
  on public.product_images for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Product images: admin can delete" on public.product_images;
create policy "Product images: admin can delete"
  on public.product_images for delete
  to anon, authenticated
  using (true);
