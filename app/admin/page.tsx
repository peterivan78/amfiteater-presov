import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { EventItem } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/login');
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data } = await supabase.from('events').select('*').order('start_at', { ascending: false });
  const events = (data ?? []) as EventItem[];

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Administrácia</h1>
          <p className="text-black/60">Správa podujatí</p>
        </div>
        <Link className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white" href="/admin/events/new">Nové podujatie</Link>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <Link key={event.id} href={`/admin/events/${event.id}`} className="block rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{event.title}</h2>
                <p className="text-sm text-black/60">{formatDateTime(event.start_at)}</p>
              </div>
              <span className="rounded-full bg-black/5 px-3 py-1 text-xs">{event.is_published ? 'Publikované' : 'Skryté'}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
