-- Adds the homepage switches used by the admin product form.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.

alter table public.products
  add column if not exists is_featured  boolean not null default false,
  add column if not exists is_trending  boolean not null default false,
  add column if not exists is_signature boolean not null default false;

-- Existing products without a status count as visible.
update public.products set status = 'active' where status is null;
