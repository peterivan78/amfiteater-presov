import { Hero } from '@/components/Hero';
import { EventsSection } from '@/components/EventsSection';
import { InfoSections } from '@/components/InfoSections';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { EventItem } from '@/lib/types';

async function getEvents() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      upcoming: [] as EventItem[],
      archive: [] as EventItem[]
    };
  }

  const now = new Date().toISOString();

  const [upcomingResult, archiveResult] = await Promise.all([
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('start_at', now)
      .order('is_featured', { ascending: false })
      .order('start_at', { ascending: true }),
    supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .lt('start_at', now)
      .order('start_at', { ascending: false })
      .limit(12)
  ]);

  return {
    upcoming: (upcomingResult.data ?? []) as EventItem[],
    archive: (archiveResult.data ?? []) as EventItem[]
  };
}

export default async function HomePage() {
  const { upcoming, archive } = await getEvents();

  return (
    <main>
      <Hero />
      <EventsSection upcoming={upcoming} archive={archive} />
      <InfoSections />
    </main>
  );
}
