import type { EventItem } from '@/lib/types';
import { eventPath } from '@/lib/seo';
import { siteTimeZone } from '@/lib/utils';

export function getLineupDate(event: EventItem) {
  const start = new Date(event.start_at);
  const end = event.end_at ? new Date(event.end_at) : null;
  const dayFormatter = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, day: '2-digit' });
  const dayKeyFormatter = new Intl.DateTimeFormat('en-CA', { timeZone: siteTimeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const day = end && dayKeyFormatter.format(start) !== dayKeyFormatter.format(end) ? `${dayFormatter.format(start)}–${dayFormatter.format(end)}` : dayFormatter.format(start);
  const month = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, month: 'short' }).format(start).replace('.', '');

  return { day, month };
}

function getLineupMeta(event: EventItem) {
  const start = new Date(event.start_at);
  const time = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, hour: '2-digit', minute: '2-digit' }).format(start);
  const weekday = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, weekday: 'long' }).format(start);
  const type = event.title.toLowerCase().includes('kavej') ? 'kino' : event.title.toLowerCase().includes('na skle') ? 'divadlo' : event.title.toLowerCase().includes('žije') ? 'festival' : 'koncert';

  return { weekday, time, type };
}

export function EventCard({ event }: { event: EventItem; compact?: boolean }) {
  const date = getLineupDate(event);
  const meta = getLineupMeta(event);

  return (
    <article className="group border-t border-ink/18 py-5 transition hover:border-olive md:py-5">
      <div className="grid gap-5 md:grid-cols-[116px_1fr_32px] md:items-center">
        <div className="flex items-baseline gap-3 md:block">
          <p className="whitespace-nowrap font-display text-[2.25rem] font-bold leading-none tracking-[-0.06em] text-olive md:text-[2.65rem]">{date.day}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/55">{date.month}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-ink md:text-3xl">
            <a className="transition hover:text-rust" href={eventPath(event)}>{event.title}</a>
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
            <span>{meta.weekday}</span>
            <span aria-hidden="true">•</span>
            <span>{meta.time}</span>
            <span aria-hidden="true">•</span>
            <span>{meta.type}</span>
          </div>
        </div>
        <a className="text-3xl leading-none text-ink/55 transition group-hover:translate-x-1 group-hover:text-rust" href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>→</a>
      </div>
    </article>
  );
}
