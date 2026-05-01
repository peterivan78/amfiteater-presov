import Link from 'next/link';
import { AdminEventForm } from '@/components/AdminEventForm';
import { requireAdmin } from '@/lib/admin';

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Link href="/admin" className="mb-6 inline-block text-sm text-black/60">← späť</Link>
      <h1 className="mb-6 text-3xl font-semibold">Nové podujatie</h1>
      <AdminEventForm />
    </main>
  );
}
