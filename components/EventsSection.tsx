import type { EventItem } from '@/lib/types';
import { formatEventDateRange } from '@/lib/utils';
import { EventCard } from './EventCard';
import { FeaturedEventCard } from './FeaturedEventCard';

export function EventsSection({ upcoming, archive }: { upcoming: EventItem[]; archive: EventItem[] }) {
  const featuredEvent = upcoming.find((event) => event.is_featured);
  const regularEvents = featuredEvent ? upcoming.filter((event) => event.id !== featuredEvent.id) : upcoming;

  return (
    <>
      <section id="podujatia" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-accent">Program</p>
            <h2 className="text-3xl font-semibold md:text-5xl">Najbližšie podujatia</h2>
            <p className="mt-4 max-w-2xl leading-7 text-black/60">
              Program Amfiteátra Prešov prináša koncerty, festivaly, filmové premietania a špeciálne kultúrne podujatia počas celej sezóny.
            </p>
          </div>
        </div>
        {upcoming.length ? (
          <div className="space-y-8">
            {featuredEvent ? <FeaturedEventCard event={featuredEvent} /> : null}
            {regularEvents.length ? (
              <div className="grid gap-6 md:grid-cols-3">
                {regularEvents.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="rounded-lg border border-black/10 bg-white p-6 text-black/60">Aktuálne nie sú zverejnené žiadne najbližšie podujatia.</p>
        )}
      </section>

      {archive.length ? (
        <section id="archiv" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-black/45">Minulé podujatia</p>
            <h2 className="text-3xl font-semibold md:text-5xl">Archív podujatí</h2>
          </div>
          <div className="divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
            {archive.map((event) => (
              <div key={event.id} className="grid gap-2 p-4 transition hover:bg-black/[0.03] md:grid-cols-[220px_1fr] md:items-center md:p-5">
                <p className="text-sm text-black/55">{event.display_date ?? formatEventDateRange(event.start_at, event.end_at)}</p>
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  {event.short_description ? <p className="mt-1 text-sm leading-6 text-black/60">{event.short_description}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
