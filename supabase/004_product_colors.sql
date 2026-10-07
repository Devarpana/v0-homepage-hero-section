-- Adds the colour options each product is sold in, set from the admin panel.
-- Each entry is {"name": "Blue", "hex": "#23458d", "image": "<photo url or null>"}.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run more than once.

alter table public.products
  add column if not exists colors jsonb not null default '[]'::jsonb;
