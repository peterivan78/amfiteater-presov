'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { hasSupabaseEnv } from '@/lib/supabase-config';
import type { EventItem } from '@/lib/types';
import { toSlug } from '@/lib/utils';

export function AdminEventForm({ event }: { event?: EventItem }) {
  const router = useRouter();
  const supabaseReady = hasSupabaseEnv();
  const [title, setTitle] = useState(event?.title ?? '');
  const [startAt, setStartAt] = useState(event?.start_at ? event.start_at.slice(0, 16) : '');
  const [imageUrl, setImageUrl] = useState(event?.image_url ?? '');
  const [description, setDescription] = useState(event?.short_description ?? '');
  const [ticketUrl, setTicketUrl] = useState(event?.ticket_url ?? '');
  const [isPublished, setIsPublished] = useState(event?.is_published ?? true);
  const [isFeatured, setIsFeatured] = useState(event?.is_featured ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function uploadImage(file: File) {
    if (!supabaseReady) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    const supabase = createBrowserSupabaseClient();
    const ext = file.name.split('.').pop();
    const path = `events/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from('event-images').upload(path, file, { upsert: false });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('event-images').getPublicUrl(path);
    setImageUrl(data.publicUrl);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    if (!supabaseReady) {
      setError('Doplňte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.');
      return;
    }

    setSaving(true);
    setError('');
    const supabase = createBrowserSupabaseClient();

    const payload = {
      title,
      slug: `${toSlug(title)}-${new Date(startAt).getTime()}`,
      image_url: imageUrl,
      start_at: new Date(startAt).toISOString(),
      short_description: description || null,
      ticket_url: ticketUrl || null,
      is_published: isPublished,
      is_featured: isFeatured
    };

    const result = event?.id
      ? await supabase.from('events').update(payload).eq('id', event.id)
      : await supabase.from('events').insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  async function remove() {
    if (!event?.id) return;
    if (!supabaseReady) {
      setError('Doplňte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.');
      return;
    }

    const confirmed = window.confirm('Naozaj zmazať podujatie?');
    if (!confirmed) return;
    const supabase = createBrowserSupabaseClient();
    await supabase.from('events').delete().eq('id', event.id);
    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-5 rounded-3xl bg-white p-5 shadow-sm md:p-8">
      <div>
        <label className="mb-2 block text-sm font-medium">Názov</label>
        <input className="w-full rounded-xl border border-black/15 px-4 py-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Dátum a čas</label>
        <input className="w-full rounded-xl border border-black/15 px-4 py-3" type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Obrázok 1080 × 1080</label>
        <input className="w-full rounded-xl border border-black/15 px-4 py-3" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} />
        {imageUrl ? <img src={imageUrl} alt="Preview" className="mt-3 aspect-square w-40 rounded-2xl object-cover" /> : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Krátky popis</label>
        <textarea className="min-h-28 w-full rounded-xl border border-black/15 px-4 py-3" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Link na vstupenky / viac info</label>
        <input className="w-full rounded-xl border border-black/15 px-4 py-3" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} placeholder="https://" />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> Publikované</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} /> Pripnúť navrch</label>
      </div>

      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-col gap-3 md:flex-row">
        <button disabled={saving} className="rounded-xl bg-ink px-5 py-3 font-medium text-white disabled:opacity-50">{saving ? 'Ukladám…' : 'Uložiť'}</button>
        {event?.id ? <button type="button" onClick={remove} className="rounded-xl border border-red-300 px-5 py-3 font-medium text-red-700">Zmazať</button> : null}
      </div>
    </form>
  );
}
