import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import type { EventItem } from '@/lib/types';
import { formatEventDateRange } from '@/lib/utils';
import { eventPath } from '@/lib/seo';

export function EventCard({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl">
      <div className="relative aspect-[4/5] bg-ink">
        <a href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>
          <Image
            src={event.image_url}
            alt={`Plagát podujatia ${event.title} v Amfiteátri Prešov`}
            fill
            className="object-contain transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </a>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start gap-2 text-sm text-black/60">
          <CalendarDays className="mt-0.5 h-4 w-4" />
          <span>{event.display_date ?? formatEventDateRange(event.start_at, event.end_at)}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight">
          <a className="transition hover:text-accent" href={eventPath(event)}>{event.title}</a>
        </h3>
        {!compact && event.short_description ? <p className="text-sm leading-6 text-black/65">{event.short_description}</p> : null}
        {event.ticket_url ? (
          <a className="inline-flex rounded-2xl bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-accent" href={event.ticket_url} target="_blank" rel="noreferrer">
            Vstupenky / viac info
          </a>
        ) : null}
      </div>
    </article>
  );
}
