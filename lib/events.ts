import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from '@/lib/supabase-config';
import { publicEventSlug } from '@/lib/seo';
import type { EventItem } from '@/lib/types';

export const currentProgram: EventItem[] = [
  {
    id: 'current-imt-smile-2026',
    title: 'IMT Smile',
    slug: 'imt-smile-2026',
    image_url: 'https://placehold.co/1080x1080/111111/FFFFFF/png?text=IMT+Smile',
    event_type: 'koncert',
    start_at: '2026-06-27T18:00:00+02:00',
    display_date: '27. júna 2026',
    short_description: 'Letný koncert v Amfiteátri Prešov.',
    ticket_url: null,
    is_featured: true,
    is_published: true,
    created_at: '2026-05-01T00:00:00+00:00',
    updated_at: '2026-05-01T00:00:00+00:00'
  },
  {
    id: 'current-kavej-2026',
    title: 'Kavej',
    slug: 'kavej-2026',
    image_url: 'https://placehold.co/1080x1080/111111/FFFFFF/png?text=Kavej',
    event_type: 'letné kino',
    start_at: '2026-07-18T20:30:00+02:00',
    display_date: '18. júla 2026',
    short_description: 'Premietanie filmu pod holým nebom.',
    ticket_url: null,
    is_featured: false,
    is_published: true,
    created_at: '2026-05-01T00:00:00+00:00',
    updated_at: '2026-05-01T00:00:00+00:00'
  },
  {
    id: 'current-hip-hop-zije-2026',
    title: 'Hip Hop žije',
    slug: 'hip-hop-zije-2026',
    image_url: 'https://placehold.co/1080x1080/111111/FFFFFF/png?text=Hip+Hop+zije',
    event_type: 'festival',
    start_at: '2026-07-31T18:00:00+02:00',
    end_at: '2026-08-01T23:00:00+02:00',
    short_description: 'Festival Hip Hop žije v Amfiteátri Prešov.',
    ticket_url: null,
    is_featured: false,
    is_published: true,
    created_at: '2026-05-01T00:00:00+00:00',
    updated_at: '2026-05-01T00:00:00+00:00'
  },
  {
    id: 'current-na-skle-malovane-2026',
    title: 'Na skle maľované',
    slug: 'na-skle-malovane-2026',
    image_url: 'https://placehold.co/1080x1080/111111/FFFFFF/png?text=Na+skle+malovane',
    event_type: 'divadlo',
    start_at: '2026-08-21T19:00:00+02:00',
    display_date: '21. augusta 2026',
    short_description: 'Hudobno-divadelné predstavenie Na skle maľované.',
    ticket_url: null,
    is_featured: false,
    is_published: true,
    created_at: '2026-05-01T00:00:00+00:00',
    updated_at: '2026-05-01T00:00:00+00:00'
  }
];

const demoSlugs = new Set(['letny-koncert-v-amfiteatri', 'kino-pod-holym-nebom']);

function isDemoProgram(events: EventItem[]) {
  return events.length > 0 && events.every((event) => demoSlugs.has(event.slug));
}

export async function getEvents() {
  const env = getSupabaseEnv();

  if (!env) {
    return {
      upcoming: currentProgram,
      archive: [] as EventItem[]
    };
  }

  const supabase = createClient(env.url, env.anonKey);
  const now = new Date().toISOString();

  const [upcomingResult, archiveResult] = await Promise.all([
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('start_at', now)
      .order('start_at', { ascending: true }),
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .lt('start_at', now)
      .order('start_at', { ascending: false })
      .limit(12)
  ]);

  const upcoming = (upcomingResult.data ?? []) as EventItem[];
  const archive = (archiveResult.data ?? []) as EventItem[];

  if (isDemoProgram(upcoming)) {
    return {
      upcoming: currentProgram,
      archive: [] as EventItem[]
    };
  }

  return { upcoming, archive };
}

export async function getAllPublishedEvents() {
  const env = getSupabaseEnv();

  if (!env) {
    return currentProgram;
  }

  const supabase = createClient(env.url, env.anonKey);
  const result = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('start_at', { ascending: true });

  const events = (result.data ?? []) as EventItem[];

  if (isDemoProgram(events)) {
    return currentProgram;
  }

  return events;
}

export async function getEventBySlug(slug: string) {
  const events = await getAllPublishedEvents();
  return events.find((event) => event.slug === slug || publicEventSlug(event) === slug) ?? null;
}
