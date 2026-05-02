import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import type { EventItem } from '@/lib/types';
import { formatEventDateRange } from '@/lib/utils';
import { eventPath } from '@/lib/seo';

export function FeaturedEventCard({ event }: { event: EventItem }) {
  const imageUrl = event.cover_image_url || event.image_url;

  return (
    <article className="group overflow-hidden rounded-2xl bg-ink text-white shadow-xl transition duration-200 hover:shadow-2xl">
      <div className="grid md:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[320px] bg-black/20 md:min-h-[460px]">
          <a href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>
            <Image
              src={imageUrl}
              alt={`Vizuál podujatia ${event.title} v Amfiteátri Prešov`}
              fill
              className="object-contain transition duration-300 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />
          </a>
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.25em] text-white/45">Highlight sezóny</p>
            <div className="mb-5 flex items-start gap-2 text-sm text-white/65">
              <CalendarDays className="mt-0.5 h-4 w-4" />
              <span>{event.display_date ?? formatEventDateRange(event.start_at, event.end_at)}</span>
            </div>
            <h3 className="text-4xl font-semibold leading-tight md:text-6xl">
              <a className="transition hover:text-accent" href={eventPath(event)}>{event.title}</a>
            </h3>
            {event.short_description ? <p className="mt-6 text-base leading-7 text-white/70">{event.short_description}</p> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="inline-flex w-fit rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-accent hover:text-accent" href={eventPath(event)}>
              Detail podujatia
            </a>
            {event.ticket_url ? (
              <a className="inline-flex w-fit rounded-2xl bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-accent hover:text-white" href={event.ticket_url} target="_blank" rel="noreferrer">
                Vstupenky / viac info
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
