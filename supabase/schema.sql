create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  image_url text not null,
  cover_image_url text,
  event_type text,
  start_at timestamptz not null,
  end_at timestamptz,
  short_description text,
  ticket_url text,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events
add column if not exists cover_image_url text;

alter table public.events
add column if not exists event_type text;

alter table public.events
add column if not exists end_at timestamptz;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now(),
  constraint admin_users_email_lowercase check (email = lower(email))
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Admins can read own admin record" on public.admin_users;
create policy "Admins can read own admin record"
on public.admin_users for select
to authenticated
using (email = lower(auth.jwt() ->> 'email'));

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
on public.events for select
using (is_published = true);

drop policy if exists "Authenticated users can manage events" on public.events;
drop policy if exists "Admins can manage events" on public.events;
create policy "Admins can manage events"
on public.events for all
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
);

-- Before enabling the admin-only policies in production, add every admin email:
-- insert into public.admin_users (email) values ('admin@example.com') on conflict do nothing;

insert into public.events (title, slug, image_url, event_type, start_at, short_description, ticket_url, is_featured, is_published)
values
('Letný koncert v amfiteátri', 'letny-koncert-v-amfiteatri', 'https://placehold.co/1080x1080/png', 'koncert', now() + interval '14 days', 'Ukážkové budúce podujatie.', null, true, true),
('Kino pod holým nebom', 'kino-pod-holym-nebom', 'https://placehold.co/1080x1080/png', 'letné kino', now() + interval '30 days', 'Ukážkové filmové podujatie.', null, false, true),
('Minulý festival', 'minuly-festival', 'https://placehold.co/1080x1080/png', 'festival', now() - interval '30 days', 'Ukážkové archívne podujatie.', null, false, true)
on conflict (slug) do nothing;
