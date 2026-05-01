import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import type { EventItem } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export function EventCard({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-square bg-black/5">
        <Image src={event.image_url} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start gap-2 text-sm text-black/60">
          <CalendarDays className="mt-0.5 h-4 w-4" />
          <span>{formatDateTime(event.start_at)}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight">{event.title}</h3>
        {!compact && event.short_description ? <p className="text-sm leading-6 text-black/65">{event.short_description}</p> : null}
        {event.ticket_url ? (
          <a className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white" href={event.ticket_url} target="_blank" rel="noreferrer">
            Vstupenky / viac info
          </a>
        ) : null}
      </div>
    </article>
  );
}
