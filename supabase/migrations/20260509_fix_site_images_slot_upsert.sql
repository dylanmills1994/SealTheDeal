create extension if not exists pgcrypto;

alter table public.site_images
  add column if not exists slot text;

update public.site_images
set slot = coalesce(slot, 'legacy_' || left(id::text, 8))
where slot is null;

create unique index if not exists site_images_slot_unique_idx
  on public.site_images (slot);
