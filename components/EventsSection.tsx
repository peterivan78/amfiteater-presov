import type { EventItem } from '@/lib/types';
import { EventCard } from './EventCard';

export function EventsSection({ upcoming, archive }: { upcoming: EventItem[]; archive: EventItem[] }) {
  return (
    <>
      <section id="podujatia" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-accent">Program</p>
            <h2 className="text-3xl font-semibold md:text-5xl">Najbližšie podujatia</h2>
          </div>
        </div>
        {upcoming.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="rounded-3xl border border-black/10 bg-white p-6 text-black/60">Aktuálne nie sú zverejnené žiadne najbližšie podujatia.</p>
        )}
      </section>

      <section id="archiv" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-black/45">Minulé podujatia</p>
          <h2 className="text-3xl font-semibold md:text-5xl">Archív podujatí</h2>
        </div>
        {archive.length ? (
          <div className="grid gap-6 md:grid-cols-4">
            {archive.map((event) => <EventCard key={event.id} event={event} compact />)}
          </div>
        ) : (
          <p className="rounded-3xl border border-black/10 bg-white p-6 text-black/60">Archív je zatiaľ prázdny.</p>
        )}
      </section>
    </>
  );
}
