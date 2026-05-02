'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { hasSupabaseEnv } from '@/lib/supabase-config';
import type { EventItem } from '@/lib/types';
import { toSlug } from '@/lib/utils';

const posterMaxWidth = 1080;
const coverMaxWidth = 1600;
const maxSourceSize = 25 * 1024 * 1024;

type ImageKind = 'poster' | 'cover';

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Obrázok sa nepodarilo načítať.'));
    image.src = src;
  });
}

function canvasToWebp(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Konverzia obrázka zlyhala.'));
          return;
        }

        resolve(blob);
      },
      'image/webp',
      0.86
    );
  });
}

async function convertImageToWebp(file: File, maxWidth: number) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const width = Math.min(maxWidth, image.naturalWidth);
    const height = Math.round((image.naturalHeight / image.naturalWidth) * width);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Prehliadač nepodporuje spracovanie obrázkov.');
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    return canvasToWebp(canvas);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function formatSupabaseError(err: unknown) {
  if (!(err instanceof Error)) {
    return 'Operácia zlyhala.';
  }

  const message = err.message.toLowerCase();

  if (message.includes('bucket not found')) {
    return 'Supabase Storage bucket "event-images" neexistuje. V Supabase treba najprv spustiť supabase/storage.sql alebo vytvoriť public bucket event-images.';
  }

  if (message.includes('column') && message.includes('cover_image_url')) {
    return 'V Supabase tabuľke events chýba stĺpec cover_image_url. Spustite aktualizovaný supabase/schema.sql.';
  }

  if (message.includes('column') && message.includes('end_at')) {
    return 'V Supabase tabuľke events chýba stĺpec end_at. Spustite aktualizovaný supabase/schema.sql.';
  }

  if (message.includes('row-level security') || message.includes('permission denied') || message.includes('unauthorized')) {
    return 'Nemáte oprávnenie na túto operáciu. Skontrolujte, či je váš email v ADMIN_EMAILS aj v tabuľke public.admin_users a či sú aplikované Supabase policies.';
  }

  return err.message;
}

function validateImage(file: File) {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return 'Nahrajte obrázok vo formáte JPG, PNG alebo WebP. PDF a SVG nie sú podporované.';
  }

  if (file.size > maxSourceSize) {
    return 'Obrázok je príliš veľký. Nahrajte súbor do 25 MB.';
  }

  return '';
}

export function AdminEventForm({ event }: { event?: EventItem }) {
  const router = useRouter();
  const supabaseReady = hasSupabaseEnv();
  const [title, setTitle] = useState(event?.title ?? '');
  const [startAt, setStartAt] = useState(event?.start_at ? event.start_at.slice(0, 16) : '');
  const [endAt, setEndAt] = useState(event?.end_at ? event.end_at.slice(0, 16) : '');
  const [posterImageUrl, setPosterImageUrl] = useState(event?.image_url ?? '');
  const [coverImageUrl, setCoverImageUrl] = useState(event?.cover_image_url ?? '');
  const [description, setDescription] = useState(event?.short_description ?? '');
  const [ticketUrl, setTicketUrl] = useState(event?.ticket_url ?? '');
  const [isPublished, setIsPublished] = useState(event?.is_published ?? true);
  const [isFeatured, setIsFeatured] = useState(event?.is_featured ?? false);
  const [uploadingImage, setUploadingImage] = useState<ImageKind | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function uploadImage(file: File, kind: ImageKind) {
    const validationError = validateImage(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!supabaseReady) {
      setError('Doplňte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.');
      return;
    }

    setUploadingImage(kind);
    setError('');

    try {
      const blob = await convertImageToWebp(file, kind === 'poster' ? posterMaxWidth : coverMaxWidth);
      const supabase = createBrowserSupabaseClient();
      const safeName = toSlug(title || file.name.replace(/\.[^.]+$/, '') || 'podujatie');
      const folder = kind === 'poster' ? 'posters' : 'covers';
      const path = `events/${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}.webp`;
      const { error: uploadError } = await supabase.storage.from('event-images').upload(path, blob, {
        contentType: 'image/webp',
        upsert: false
      });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('event-images').getPublicUrl(path);

      if (kind === 'poster') {
        setPosterImageUrl(data.publicUrl);
      } else {
        setCoverImageUrl(data.publicUrl);
      }
    } catch (err) {
      setError(formatSupabaseError(err));
    } finally {
      setUploadingImage(null);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    if (!supabaseReady) {
      setError('Doplňte NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY do .env.local.');
      return;
    }

    if (!posterImageUrl) {
      setError('Nahrajte plagát podujatia. Plagát je povinný.');
      return;
    }

    if (endAt && new Date(endAt) < new Date(startAt)) {
      setError('Koniec podujatia nemôže byť pred začiatkom.');
      return;
    }

    setSaving(true);
    setError('');
    const supabase = createBrowserSupabaseClient();

    const payload = {
      title,
      slug: `${toSlug(title)}-${new Date(startAt).getFullYear()}`,
      image_url: posterImageUrl,
      cover_image_url: coverImageUrl || null,
      start_at: new Date(startAt).toISOString(),
      end_at: endAt ? new Date(endAt).toISOString() : null,
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
      setError(formatSupabaseError(result.error));
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
    const result = await supabase.from('events').delete().eq('id', event.id);

    if (result.error) {
      setError(formatSupabaseError(result.error));
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={save} className="space-y-5 rounded-2xl bg-white p-5 shadow-sm md:p-8">
      <div>
        <label className="mb-2 block text-sm font-medium">Názov</label>
        <input className="w-full rounded-lg border border-black/15 px-4 py-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Začiatok</label>
          <input className="w-full rounded-lg border border-black/15 px-4 py-3" type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Koniec</label>
          <input className="w-full rounded-lg border border-black/15 px-4 py-3" type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
          <p className="mt-2 text-sm text-black/55">Voliteľné pre viacdňové podujatia.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-black/10 p-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Plagát podujatia</label>
            <input
              className="w-full rounded-lg border border-black/15 px-4 py-3"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'poster')}
            />
            <p className="mt-2 text-sm text-black/55">Povinný obrázok. Uloží sa ako WebP bez orezania, max. šírka 1080 px.</p>
          </div>
          <p className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white">
            {uploadingImage === 'poster' ? 'Nahrávam plagát…' : posterImageUrl ? 'Plagát nahratý' : 'Nahrajte plagát'}
          </p>
          {posterImageUrl ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
              <img src={posterImageUrl} alt="Plagát" className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>

        <div className="space-y-3 rounded-xl border border-black/10 p-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Cover vizuál</label>
            <input
              className="w-full rounded-lg border border-black/15 px-4 py-3"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0], 'cover')}
            />
            <p className="mt-2 text-sm text-black/55">Voliteľný široký obrázok pre zvýraznené podujatie. Uloží sa ako WebP bez orezania, max. šírka 1600 px.</p>
          </div>
          <p className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white">
            {uploadingImage === 'cover' ? 'Nahrávam cover…' : coverImageUrl ? 'Cover nahratý' : 'Cover je voliteľný'}
          </p>
          {coverImageUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
              <img src={coverImageUrl} alt="Cover" className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Krátky popis</label>
        <textarea className="min-h-28 w-full rounded-lg border border-black/15 px-4 py-3" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Link na vstupenky / viac info</label>
        <input className="w-full rounded-lg border border-black/15 px-4 py-3" value={ticketUrl} onChange={(e) => setTicketUrl(e.target.value)} placeholder="https://" />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> Publikované</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} /> Pripnúť navrch</label>
      </div>

      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-col gap-3 md:flex-row">
        <button disabled={saving} className="rounded-lg bg-ink px-5 py-3 font-medium text-white transition hover:bg-accent disabled:opacity-50">{saving ? 'Ukladám…' : 'Uložiť'}</button>
        {event?.id ? <button type="button" onClick={remove} className="rounded-lg border border-red-300 px-5 py-3 font-medium text-red-700 transition hover:bg-red-50">Zmazať</button> : null}
      </div>
    </form>
  );
}
