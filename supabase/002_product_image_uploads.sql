-- Lets the admin panel upload and remove product photos in the "products" Storage bucket.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
--
-- NOTE: until the admin login is added, these rules allow uploads with the site's public key,
-- the same as the tables today. When we add the login we will tighten them to logged-in admins only.

drop policy if exists "Product images: public upload" on storage.objects;
create policy "Product images: public upload"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'products');

drop policy if exists "Product images: public read" on storage.objects;
create policy "Product images: public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'products');

drop policy if exists "Product images: public delete" on storage.objects;
create policy "Product images: public delete"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'products');
