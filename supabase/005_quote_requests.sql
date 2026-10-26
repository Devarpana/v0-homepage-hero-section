-- Quote form on /custom-orders: extra fields, and permission for visitors to send a request.
-- Visitors can add a request and upload files, but never read, list, change or delete them.

alter table public.custom_requests
  add column if not exists service text,
  add column if not exists material text,
  add column if not exists quantity integer,
  add column if not exists contact_preference text,
  add column if not exists file_paths text[] not null default '{}';

drop policy if exists "Quote form can add new requests" on public.custom_requests;
create policy "Quote form can add new requests" on public.custom_requests
  for insert to anon, authenticated
  with check (status = 'new' and quotation_amount is null and internal_notes is null);

drop policy if exists "Quote form can upload files" on storage.objects;
create policy "Quote form can upload files" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'custom-orders' and (storage.foldername(name))[1] = 'requests');
