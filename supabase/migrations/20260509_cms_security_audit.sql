create table if not exists public.site_content (
  id text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
to anon, authenticated
using (true);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_content_set_updated_at on public.site_content;
create trigger trg_site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_site_content_updated_at();
