-- Supabase migration: Seal The Deal image management setup
--
-- This migration creates and configures:
-- 1) Public Storage bucket for site images
-- 2) public.site_images table for mapping image slots to image URLs
-- 3) RLS + read-only public access policies (no public write policies)
-- 4) updated_at trigger/function
-- 5) Starter rows for hero logo + gallery slots
--
-- IMPORTANT:
-- - No secrets are included in this SQL.
-- - Public users can read image metadata and public bucket objects.
-- - Writes (insert/update/delete, uploads) should be performed ONLY via
--   trusted server-side code using SUPABASE_SERVICE_ROLE_KEY.

-- Ensure required extension is available for gen_random_uuid()
create extension if not exists pgcrypto;

-- 1) Storage bucket setup (idempotent)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'seal-the-deal-images',
  'seal-the-deal-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Table for image slot mapping
create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  slot text unique not null,
  label text not null,
  image_url text not null,
  storage_path text null,
  alt_text text null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Useful indexes for common public-site query patterns
create index if not exists site_images_slot_idx on public.site_images (slot);
create index if not exists site_images_is_active_idx on public.site_images (is_active);
create index if not exists site_images_sort_order_idx on public.site_images (sort_order);

-- 3) updated_at maintenance trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_images_set_updated_at on public.site_images;
create trigger trg_site_images_set_updated_at
before update on public.site_images
for each row
execute function public.set_updated_at();

-- 4) Enable RLS
alter table public.site_images enable row level security;

-- Public read access for active rows only
-- No public write policies are intentionally created.
drop policy if exists "Public can read active site images" on public.site_images;
create policy "Public can read active site images"
on public.site_images
for select
to anon, authenticated
using (is_active = true);

-- NOTE: Admin writes should be done via trusted server-side code
-- using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS).

-- 5) Storage object policies
-- Public read for bucket objects only.
-- No public upload/update/delete policies are intentionally created.
drop policy if exists "Public read seal-the-deal images bucket" on storage.objects;
create policy "Public read seal-the-deal images bucket"
on storage.objects
for select
to public
using (bucket_id = 'seal-the-deal-images');

-- NOTE: Uploads/updates/deletes should be performed via trusted
-- server-side code using SUPABASE_SERVICE_ROLE_KEY.

-- 6) Seed starter image slots
-- Verified local files exist in public/images/Gallery.
insert into public.site_images (slot, label, image_url, storage_path, alt_text, sort_order, is_active)
values
  (
    'hero_logo',
    'Hero Logo',
    '/images/Gallery/seal-the-deal-logo-clean.png',
    null,
    'Seal The Deal Asphalt Care & Masonry logo',
    0,
    true
  ),
  ('gallery_1', 'Gallery Image 1', '/images/Gallery/1.jpg', null, 'Seal The Deal project photo 1', 10, true),
  ('gallery_2', 'Gallery Image 2', '/images/Gallery/2.jpg', null, 'Seal The Deal project photo 2', 20, true),
  ('gallery_3', 'Gallery Image 3', '/images/Gallery/3.jpg', null, 'Seal The Deal project photo 3', 30, true),
  ('gallery_4', 'Gallery Image 4', '/images/Gallery/4.jpg', null, 'Seal The Deal project photo 4', 40, true),
  ('gallery_5', 'Gallery Image 5', '/images/Gallery/5.jpg', null, 'Seal The Deal project photo 5', 50, true),
  ('gallery_6', 'Gallery Image 6', '/images/Gallery/6.jpg', null, 'Seal The Deal project photo 6', 60, true)
on conflict (slot) do update
set
  label = excluded.label,
  image_url = excluded.image_url,
  storage_path = excluded.storage_path,
  alt_text = excluded.alt_text,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
