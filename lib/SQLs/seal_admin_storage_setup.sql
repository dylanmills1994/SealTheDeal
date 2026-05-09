-- Seal The Deal admin storage + image metadata setup
-- Safe to run multiple times.

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = excluded.public;

-- Public read-only access for website image rendering.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read site-assets'
  ) then
    create policy "Public read site-assets"
      on storage.objects
      for select
      to public
      using (bucket_id = 'site-assets');
  end if;
end $$;

create extension if not exists pgcrypto;

create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  slot text unique not null,
  label text,
  image_url text not null,
  storage_path text,
  alt_text text,
  sort_order integer,
  is_active boolean default true,
  updated_at timestamptz default now()
);

alter table public.site_images
  add column if not exists slot text,
  add column if not exists label text,
  add column if not exists storage_path text,
  add column if not exists sort_order integer,
  add column if not exists is_active boolean default true;

update public.site_images
set slot = coalesce(slot, 'legacy_' || left(id::text, 8))
where slot is null;

create unique index if not exists site_images_slot_unique_idx on public.site_images (slot);

alter table public.site_images enable row level security;

-- Allow public read-only access for site image metadata.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'site_images'
      and policyname = 'Public read site_images'
  ) then
    create policy "Public read site_images"
      on public.site_images
      for select
      to public
      using (true);
  end if;
end $$;

-- No anon insert/update/delete policies are created for either table.
