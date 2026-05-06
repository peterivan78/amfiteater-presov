import Image from 'next/image';
import type { EventItem } from '@/lib/types';
import { formatEventDateRange } from '@/lib/utils';
import { eventPath } from '@/lib/seo';
import { nbsp, upcomingEventsLabel } from '@/lib/typography';
import { EventCard } from './EventCard';

export function EventsSection({ upcoming, archive }: { upcoming: EventItem[]; archive: EventItem[] }) {
  const homepageEvents = [...upcoming].sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()).slice(0, 3);

  return (
    <>
      <section id="program" className="bg-paper">
        <span id="podujatia" className="sr-only" aria-hidden="true" />
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="scroll-reveal px-5 py-9 md:px-10 md:py-10 lg:pl-16 lg:pr-10 xl:pl-24 2xl:pl-32">
            <div className="mb-6 max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">Najbližšie podujatia</p>
            </div>
            {upcoming.length ? (
              <div className="border-b border-ink/18">
                {homepageEvents.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            ) : (
              <p className="border-y border-ink/15 py-8 text-ink/60">Aktuálne nie sú zverejnené žiadne najbližšie podujatia.</p>
            )}
            <div className="mt-8">
              <a className="inline-flex border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-rust hover:text-rust" href="/program">
                Zobraziť všetky podujatia
              </a>
              <span className="ml-4 align-baseline text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                {upcomingEventsLabel(upcoming.length)}
              </span>
            </div>
          </div>
          <div className="relative order-first min-h-[360px] overflow-hidden bg-olive lg:order-none lg:min-h-full">
            <Image
              src="/assets/Amfiteater-Presov-vstup-park_XH24414-1.webp"
              alt="Parkový vstup a atmosféra kultúrneho areálu Amfiteáter Prešov"
              fill
              className="image-drift object-cover saturate-[0.86]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/28 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-3xl px-5 pb-8 text-[#F5F1E8] md:px-10 md:pb-10 lg:px-14">
              <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] md:text-6xl">Program sezóny</h2>
              <p className="mt-5 max-w-xl leading-7 text-[#F5F1E8]/72">
                {nbsp('Program Amfiteátra Prešov prináša koncerty, festivaly, filmové premietania a špeciálne kultúrne podujatia počas celej sezóny.')}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#F5F1E8]/62">
                {nbsp('Amfiteáter Prešov je open-air kultúrny priestor pre koncerty, festivaly, letné kino a komunitné podujatia v Prešove. Počas sezóny prináša program pod holým nebom v areáli, ktorý spája mestskú dostupnosť, parkovú atmosféru a históriu jedného z najvýraznejších kultúrnych miest v meste.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {archive.length ? (
        <section id="archiv" className="bg-paper px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.34fr_0.66fr]">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/45">Minulé podujatia</p>
              <h2 className="text-3xl font-semibold leading-none tracking-[-0.05em] md:text-5xl">Archív podujatí</h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-ink/55">
                {nbsp('Výber podujatí, ktoré už prebehli v aktuálnej sezóne.')}
              </p>
            </div>
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {archive.map((event) => (
                <div key={event.id} className="grid gap-2 py-5 transition hover:bg-ink/[0.025] md:grid-cols-[180px_1fr] md:items-center">
                  <p className="text-sm text-ink/55">{formatEventDateRange(event.start_at, event.end_at)}</p>
                  <div>
                    <h3 className="font-semibold">
                      <a className="transition hover:text-accent" href={eventPath(event)}>{event.title}</a>
                    </h3>
                    {event.short_description ? <p className="mt-1 text-sm leading-6 text-ink/60">{event.short_description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
