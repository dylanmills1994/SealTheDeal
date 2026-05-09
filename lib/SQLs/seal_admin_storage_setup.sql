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

create table if not exists public.site_images (
  id text primary key,
  image_url text not null,
  alt_text text,
  updated_at timestamptz not null default now()
);

alter table public.site_images
  add column if not exists slot text,
  add column if not exists label text,
  add column if not exists storage_path text,
  add column if not exists sort_order integer,
  add column if not exists is_active boolean default true;

update public.site_images
set slot = coalesce(slot, id),
    label = coalesce(label, id)
where slot is null or label is null;

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
