import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AdminEventForm } from '@/components/AdminEventForm';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { EventItem } from '@/lib/types';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/login');
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { id } = await params;
  const { data } = await supabase.from('events').select('*').eq('id', id).single();
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Link href="/admin" className="mb-6 inline-block text-sm text-black/60">← späť</Link>
      <h1 className="mb-6 text-3xl font-semibold">Upraviť podujatie</h1>
      <AdminEventForm event={data as EventItem} />
    </main>
  );
}
