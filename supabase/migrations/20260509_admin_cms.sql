create table if not exists public.site_content (
  id text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create index if not exists site_content_updated_at_idx on public.site_content (updated_at);

insert into public.site_images (slot, label, image_url, alt_text, sort_order, is_active)
values
('services_sealcoating','services_sealcoating','/images/Gallery/20.jpg','Sealcoating',101,true),
('services_crack_filling','services_crack_filling','/images/Gallery/23.jpg','Crack Filling',102,true),
('services_masonry','services_masonry','/images/Gallery/30.jpg','Masonry Work',103,true),
('services_concrete','services_concrete','/images/Gallery/25.jpg','Concrete Work',104,true)
on conflict (slot) do nothing;
