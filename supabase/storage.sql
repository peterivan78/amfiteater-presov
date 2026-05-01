insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

create policy "Public can read event images"
on storage.objects for select
using (bucket_id = 'event-images');

create policy "Authenticated users can upload event images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'event-images');

create policy "Authenticated users can update event images"
on storage.objects for update
to authenticated
using (bucket_id = 'event-images')
with check (bucket_id = 'event-images');

create policy "Authenticated users can delete event images"
on storage.objects for delete
to authenticated
using (bucket_id = 'event-images');
