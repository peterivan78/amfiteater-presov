import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminEventForm } from '@/components/AdminEventForm';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function NewEventPage() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect('/login');
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Link href="/admin" className="mb-6 inline-block text-sm text-black/60">← späť</Link>
      <h1 className="mb-6 text-3xl font-semibold">Nové podujatie</h1>
      <AdminEventForm />
    </main>
  );
}
