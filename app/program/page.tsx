import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLineupDate } from '@/components/EventCard';
import { getAllPublishedEvents } from '@/lib/events';
import { eventImageAlt, eventPath, eventType, siteUrl } from '@/lib/seo';
import type { EventItem } from '@/lib/types';
import { nbsp } from '@/lib/typography';
import { siteTimeZone } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Program – Amfiteáter Prešov',
  description: 'Aktuálny program podujatí v Amfiteátri Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia pod holým nebom.',
  alternates: {
    canonical: `${siteUrl}/program`
  }
};

function getProgramMeta(event: EventItem) {
  const start = new Date(event.start_at);
  const weekday = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, weekday: 'long' }).format(start);
  const time = new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, hour: '2-digit', minute: '2-digit' }).format(start);
  const type = eventType(event);

  return { weekday, time, type };
}

function ProgramVisualCard({ event }: { event: EventItem }) {
  const date = getLineupDate(event);
  const meta = getProgramMeta(event);

  return (
    <article className="group grid border-t border-ink/15 py-8 md:grid-cols-[160px_220px_1fr_80px] md:items-center md:gap-8">
      <div className="mb-5 flex items-baseline gap-3 md:mb-0 md:block">
        <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-olive md:text-6xl">{date.day}</p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/55">{date.month}</p>
      </div>
      <a className="relative mb-5 aspect-[4/5] overflow-hidden bg-ink/10 md:mb-0" href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>
        <Image
          src={event.image_url}
          alt={eventImageAlt(event)}
          fill
          className="object-contain transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 220px"
        />
      </a>
      <div>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
          <a className="transition hover:text-rust" href={eventPath(event)}>{event.title}</a>
        </h2>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
          <span>{meta.weekday}</span>
          <span aria-hidden="true">•</span>
          <span>{meta.time}</span>
          <span aria-hidden="true">•</span>
          <span>{meta.type}</span>
        </div>
        {event.short_description ? <p className="mt-5 max-w-2xl text-sm leading-6 text-ink/60">{nbsp(event.short_description)}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          {event.ticket_url ? (
            <a
              className="inline-flex border border-ink bg-ink px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-paper transition hover:border-rust hover:bg-rust"
              href={event.ticket_url}
              target="_blank"
              rel="noreferrer"
            >
              Vstupenky
            </a>
          ) : null}
          <a
            className="inline-flex border border-ink/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-rust hover:text-rust"
            href={eventPath(event)}
          >
            Detail
          </a>
        </div>
      </div>
      <a className="mt-5 text-right text-3xl leading-none text-ink/55 transition group-hover:translate-x-1 group-hover:text-rust md:mt-0" href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>→</a>
    </article>
  );
}

export default async function ProgramPage() {
  const events = await getAllPublishedEvents();
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <nav className="mb-16 flex items-start justify-between gap-6 text-[11px] font-semibold uppercase tracking-[0.22em]">
          <Link href="/" className="flex items-center" aria-label="Amfiteáter Prešov">
            <Image
              src="/assets/Amfiteater-Presov_lg-2lines_white-bg.svg"
              alt="Amfiteáter Prešov"
              width={283}
              height={283}
              className="h-14 w-auto"
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link className="transition hover:text-rust" href="/#program">Program</Link>
            <Link className="transition hover:text-rust" href="/#o-amfiteatri">O amfiteátri</Link>
            <Link className="transition hover:text-rust" href="/#prenajom">Prenájom</Link>
            <Link className="transition hover:text-rust" href="/#kontakt">Kontakt</Link>
          </div>
        </nav>

        <div className="scroll-reveal mb-12 max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">Program</p>
          <h1 className="text-5xl font-semibold leading-none tracking-[-0.06em] md:text-8xl">Všetky podujatia</h1>
          <p className="mt-6 max-w-2xl leading-7 text-ink/62">
            {nbsp('Program Amfiteátra Prešov prináša koncerty, festivaly, filmové premietania a špeciálne kultúrne podujatia počas celej sezóny.')}
          </p>
        </div>

        {events.length ? (
          <div className="scroll-reveal border-b border-ink/18">
            {events.map((event) => <ProgramVisualCard key={event.id} event={event} />)}
          </div>
        ) : (
          <p className="border-y border-ink/15 py-8 text-ink/60">Aktuálne nie sú zverejnené žiadne podujatia.</p>
        )}
      </section>

      <footer className="bg-footer px-5 py-12 text-[#F5F1E8] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F1E8]/45">Kontakt</p>
            <div className="space-y-2 text-sm text-[#F5F1E8]/68">
              <p className="font-medium text-[#F5F1E8]">Občianske združenie Amfiteáter Prešov</p>
              <p>Floriánova 6, 08001 Prešov</p>
              <p><a className="transition hover:text-accent" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
            </div>
          </div>
          <div className="flex gap-5 text-[#F5F1E8]/62">
            <Link className="transition hover:text-accent" href="/">Domov</Link>
            <Link className="transition hover:text-accent" href="/#prenajom">Prenájom</Link>
          </div>
          <div className="text-sm text-[#F5F1E8]/45 md:text-right">Copyright {currentYear} Amfiteáter Prešov. Made by PI LAB</div>
        </div>
      </footer>
    </main>
  );
}
