-- Seal The Deal Supabase setup for public website image management.
-- This script:
-- 1) Creates/updates a public storage bucket for site images.
-- 2) Creates public.site_images for image slot-to-URL mapping.
-- 3) Enables RLS with public read-only access.
-- 4) Adds a trigger to maintain updated_at.
-- 5) Adds storage/object public read-only policy.
--
-- IMPORTANT:
-- - Do NOT place secrets in this script.
-- - Do NOT create public write policies.
-- - Admin uploads/updates/deletes should be done only from secure server-side code
--   using SUPABASE_SERVICE_ROLE_KEY.

-- Ensure needed extension is available for gen_random_uuid().
create extension if not exists pgcrypto;

-- 1) Storage bucket (idempotent insert + safe update)
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

-- 2) Site image mapping table
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

-- 3) updated_at maintenance
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

-- 4) Helpful indexes
create index if not exists idx_site_images_is_active on public.site_images (is_active);
create index if not exists idx_site_images_sort_order on public.site_images (sort_order);
create index if not exists idx_site_images_active_sort on public.site_images (is_active, sort_order);

-- 5) Starter rows (real local image paths verified from /public/images/Gallery)
insert into public.site_images (slot, label, image_url, storage_path, alt_text, sort_order, is_active)
values
  ('hero_logo', 'Homepage Hero Logo', '/images/Gallery/seal-the-deal-logo-clean.png', null, 'Seal The Deal Asphalt Care & Masonry logo', 0, true),
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
  is_active = excluded.is_active,
  updated_at = now();

-- 6) RLS + policies for public.site_images
alter table public.site_images enable row level security;

-- Public website can read only active image slots.
drop policy if exists "Public can read active site images" on public.site_images;
create policy "Public can read active site images"
on public.site_images
for select
to public
using (is_active = true);

-- No INSERT/UPDATE/DELETE policies are intentionally created for public or authenticated roles.
-- Admin writes should happen only via server-side code using SUPABASE_SERVICE_ROLE_KEY.

-- 7) Storage object policies (read-only for public bucket)
-- Public read access to objects in seal-the-deal-images bucket.
drop policy if exists "Public can view seal-the-deal-images objects" on storage.objects;
create policy "Public can view seal-the-deal-images objects"
on storage.objects
for select
to public
using (bucket_id = 'seal-the-deal-images');

-- No public upload/update/delete object policies are intentionally created.
-- Upload/update/delete should happen only via secure server-side code using SUPABASE_SERVICE_ROLE_KEY.
