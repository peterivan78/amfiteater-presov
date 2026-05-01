insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read event images" on storage.objects;
create policy "Public can read event images"
on storage.objects for select
using (bucket_id = 'event-images');

drop policy if exists "Authenticated users can upload event images" on storage.objects;
drop policy if exists "Admins can upload event images" on storage.objects;
create policy "Admins can upload event images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Authenticated users can update event images" on storage.objects;
drop policy if exists "Admins can update event images" on storage.objects;
create policy "Admins can update event images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
)
with check (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
);

drop policy if exists "Authenticated users can delete event images" on storage.objects;
drop policy if exists "Admins can delete event images" on storage.objects;
create policy "Admins can delete event images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where email = lower(auth.jwt() ->> 'email')
  )
);
