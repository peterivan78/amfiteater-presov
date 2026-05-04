import type { Metadata } from 'next';
import Image from 'next/image';
import { Geist, Inter } from 'next/font/google';
import { GalleryLightbox } from '@/components/v2/GalleryLightbox';
import { getEvents } from '@/lib/events';
import { eventPath } from '@/lib/seo';
import type { EventItem } from '@/lib/types';
import { formatEventDateRange } from '@/lib/utils';

const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-v2-display'
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-v2-sans'
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alternatívny dizajn – Amfiteáter Prešov',
  description: 'Alternatívna vizuálna verzia webu Amfiteáter Prešov na klientské porovnanie.',
  robots: {
    index: false,
    follow: false
  }
};

const galleryImages = [
  {
    src: '/assets/Amfiteater-Presov_XH24429-1.webp',
    alt: 'Široký pohľad na letný open-air priestor Amfiteáter Prešov'
  },
  {
    src: '/assets/Amfiteater-Presov-pohlad_XH24448-1.webp',
    alt: 'Letné svetlo nad hľadiskom Amfiteátra Prešov'
  },
  {
    src: '/assets/Amfiteater-Presov-pohlad_XH24437-1.webp',
    alt: 'Stromy a parková atmosféra v areáli Amfiteátra Prešov'
  },
  {
    src: '/assets/Amfiteater-Presov-vstup_XH24412-1.webp',
    alt: 'Vstup do mestského kultúrneho parku Amfiteáter Prešov'
  },
  {
    src: '/assets/Amfiteater-Presov-socha_XH24406-1.webp',
    alt: 'Sochársky detail a zeleň v areáli Amfiteátra Prešov'
  },
  {
    src: '/assets/Amfiteater-susosie_XH24421-1.webp',
    alt: 'Sochársky detail v areáli Amfiteátra Prešov'
  }
];

function getLineupDate(event: EventItem) {
  const start = new Date(event.start_at);
  const end = event.end_at ? new Date(event.end_at) : null;
  const day = end && start.toDateString() !== end.toDateString() ? `${String(start.getDate()).padStart(2, '0')}–${String(end.getDate()).padStart(2, '0')}` : String(start.getDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('sk-SK', { month: 'short' }).format(start).replace('.', '');

  return { day, month };
}

function getLineupMeta(event: EventItem) {
  const start = new Date(event.start_at);
  const time = new Intl.DateTimeFormat('sk-SK', { hour: '2-digit', minute: '2-digit' }).format(start);
  const weekday = new Intl.DateTimeFormat('sk-SK', { weekday: 'long' }).format(start);
  const title = event.title.toLowerCase();
  const type = title.includes('kavej') ? 'kino' : title.includes('na skle') ? 'divadlo' : title.includes('žije') ? 'festival' : 'koncert';

  return { weekday, time, type };
}

function EventLine({ event }: { event: EventItem }) {
  const date = getLineupDate(event);
  const meta = getLineupMeta(event);

  return (
    <article className="group border-t border-[#111111]/18 py-6 transition hover:border-[#313223] md:py-7">
      <div className="grid gap-5 md:grid-cols-[116px_1fr_32px] md:items-center">
        <div className="flex items-baseline gap-3 md:block">
          <p className="whitespace-nowrap text-[2.65rem] font-bold leading-none tracking-[-0.06em] text-[#313223] md:text-[3.1rem]">{date.day}</p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111]/55">{date.month}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#111111] md:text-3xl">
            <a className="transition hover:text-[#6D4B3E]" href={eventPath(event)}>{event.title}</a>
          </h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111]/55">
            <span>{meta.weekday}</span>
            <span aria-hidden="true">•</span>
            <span>{meta.time}</span>
            <span aria-hidden="true">•</span>
            <span>{meta.type}</span>
          </div>
        </div>
        <a className="text-3xl leading-none text-[#111111]/55 transition group-hover:translate-x-1 group-hover:text-[#6D4B3E]" href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>→</a>
      </div>
    </article>
  );
}

function Hero({ hasArchive }: { hasArchive: boolean }) {
  return (
    <section className="bg-[#F2EFE8] text-[#F5F1E8]">
      <div className="relative overflow-hidden bg-[#111111]">
        <div className="relative aspect-[3000/1277] min-h-[360px] w-full md:min-h-0">
          <Image
            src="/assets/Amfiteater-Presov-pohlad-na-amfiteater-by-Peter-Ivan-XH24392_v4.webp"
            alt="Večerný panoramatický pohľad na open-air priestor Amfiteáter Prešov"
            fill
            priority
            className="object-contain md:object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.72)_0%,rgba(17,17,17,0.34)_42%,rgba(17,17,17,0.04)_100%)]" />
        </div>
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-between px-5 py-5 md:px-8 md:py-7">
          <nav className="flex items-start justify-between gap-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F1E8] md:text-[11px]">
            <a href="/v2" className="flex items-center" aria-label="Amfiteáter Prešov">
              <Image src="/assets/logo.svg" alt="Amfiteáter Prešov" width={228} height={60} className="h-9 w-auto brightness-0 invert md:h-12" />
            </a>
            <div className="hidden items-center gap-10 md:flex">
              <a className="transition hover:text-[#C8A46B]" href="#program">Program</a>
              <a className="transition hover:text-[#C8A46B]" href="#o-amfiteatri">O amfiteátri</a>
              <a className="transition hover:text-[#C8A46B]" href="#prenajom">Prenájom</a>
              {hasArchive ? <a href="#archiv">Archív</a> : null}
              <a className="transition hover:text-[#C8A46B]" href="#kontakt">Kontakt</a>
              <span className="block h-4 w-6 border-y border-[#F5F1E8]/70" aria-hidden="true" />
            </div>
          </nav>
          <div className="max-w-5xl pb-8 md:pb-14">
            <p className="mb-3 text-sm text-[#F5F1E8]/75 md:mb-5 md:text-lg">Pod holým nebom.</p>
            <p className="text-[clamp(3.2rem,9vw,8.6rem)] font-bold leading-[0.88] tracking-[-0.07em]">
              Hudba.<br />Kino.<br />Kultúra.
            </p>
            <div className="mt-5 flex flex-col gap-4 md:mt-8 md:flex-row md:items-end md:gap-10">
              <a className="inline-flex w-fit bg-[#313223] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F1E8] transition hover:bg-[#6D4B3E] md:px-7 md:py-4 md:text-[11px]" href="#program">
                Program podujatí
              </a>
              <p className="max-w-md text-xs leading-6 text-[#F5F1E8]/72 md:text-sm md:leading-7">
                Letné koncerty, filmové večery, festivaly a komunitné podujatia v priestore, ktorý patrí prešovčanom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsSection({ upcoming, archive }: { upcoming: EventItem[]; archive: EventItem[] }) {
  const sortedUpcoming = [...upcoming].sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
  const homepageEvents = sortedUpcoming.slice(0, 3);

  return (
    <>
      <section id="program" className="bg-[#F2EFE8]">
        <div className="grid border-y border-[#111111]/10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="v2-scroll-reveal px-5 py-12 md:px-10 md:py-16 lg:pl-16 lg:pr-10 xl:pl-24 2xl:pl-32">
            <div className="mb-10 max-w-2xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6D4B3E]">Najbližšie podujatia</p>
              <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] text-[#111111] md:text-6xl">Program sezóny</h2>
              <p className="mt-5 max-w-xl leading-7 text-[#111111]/62">
                Program Amfiteátra Prešov prináša koncerty, festivaly, filmové premietania a špeciálne kultúrne podujatia počas celej sezóny.
              </p>
            </div>
            {homepageEvents.length ? (
              <div className="border-b border-[#111111]/18">
                {homepageEvents.map((event) => <EventLine key={event.id} event={event} />)}
              </div>
            ) : (
              <p className="border-y border-[#111111]/15 py-8 text-[#111111]/60">Aktuálne nie sú zverejnené žiadne najbližšie podujatia.</p>
            )}
            <div className="mt-8">
              <a className="inline-flex border-b border-[#111111] pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111] transition hover:border-[#6D4B3E] hover:text-[#6D4B3E]" href="#vsetky-podujatia">
                Zobraziť všetky podujatia
              </a>
            </div>
          </div>
          <div className="relative min-h-[460px] overflow-hidden bg-[#313223] lg:min-h-full">
            <Image src="/assets/Amfiteater-Presov-vstup-park_XH24414-1.webp" alt="Parkový vstup a atmosféra kultúrneho areálu Amfiteáter Prešov" fill className="v2-image-drift object-cover saturate-[0.86]" sizes="(max-width: 1024px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-[#313223]/10" />
          </div>
        </div>
      </section>

      <section id="vsetky-podujatia" className="mx-auto max-w-7xl bg-[#F2EFE8] px-5 py-16 text-[#111111] md:px-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#111111]/45">Všetky podujatia</p>
          <h2 className="text-3xl font-semibold md:text-5xl">Program</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[...upcoming, ...archive].map((event) => (
            <article key={event.id} className="group border border-[#111111]/10 bg-[#F2EFE8]">
              <a className="relative block aspect-[4/5] overflow-hidden bg-[#111111]/8" href={eventPath(event)} aria-label={`Detail podujatia ${event.title}`}>
                <Image src={event.image_url} alt={`Vizuál podujatia ${event.title} v Amfiteátri Prešov`} fill className="object-contain transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" />
              </a>
              <div className="p-5">
                <p className="text-sm text-[#111111]/55">{event.display_date ?? formatEventDateRange(event.start_at, event.end_at)}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                  <a className="transition hover:text-[#6D4B3E]" href={eventPath(event)}>{event.title}</a>
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {event.ticket_url ? <a className="inline-flex bg-[#111111] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F2EFE8] transition hover:bg-[#6D4B3E]" href={event.ticket_url} target="_blank" rel="noreferrer">Vstupenky</a> : null}
                  <a className="inline-flex border border-[#111111]/20 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#6D4B3E] hover:text-[#6D4B3E]" href={eventPath(event)}>Detail</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutSection() {
  return (
    <section id="o-amfiteatri" className="grid bg-[#313223] text-[#F5F1E8] lg:grid-cols-[0.45fr_0.55fr]">
      <div className="v2-scroll-reveal px-5 py-16 md:px-10 md:py-24 lg:pl-16 lg:pr-14 xl:pl-24 2xl:pl-32">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C8A46B]">O amfiteátri</p>
        <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">Viac než len pódium.</h1>
        <div className="mt-8 max-w-xl space-y-5 text-lg leading-8 text-[#F5F1E8]/72">
          <p>Amfiteáter Prešov je ikonický mestský kultúrny park pod holým nebom. Priestor pre koncerty, festivaly, letné kino a večery, na ktoré sa nezabúda.</p>
          <p>Počas sezóny prináša hudbu domácich aj zahraničných interpretov, filmové projekcie a kultúrne podujatia v atmosfére, ktorú nikde inde v Prešove nenájdete.</p>
        </div>
      </div>
      <div className="relative min-h-[360px] overflow-hidden bg-[#111111] md:min-h-[520px]">
        <Image src="/assets/Amfiteater-Presov-Park-pri-vstupe_XH24403-1.webp" alt="Parková atmosféra pri vstupe do Amfiteátra Prešov" fill className="v2-image-drift object-cover saturate-[0.86]" sizes="(max-width: 1024px) 100vw, 55vw" />
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="atmosfera" className="v2-scroll-reveal border-y border-[#111111]/10 bg-[#F2EFE8] px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-8">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6D4B3E]">Fotogaléria / atmosféra</p>
          <h2 className="text-3xl font-semibold leading-none tracking-[-0.05em] md:text-4xl">Atmosféra miesta</h2>
        </div>
        <p className="hidden max-w-xs text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-[#111111]/45 md:block">Zobraziť galériu</p>
      </div>
      <div className="mx-auto max-w-7xl">
        <GalleryLightbox images={galleryImages} />
      </div>
    </section>
  );
}

function InfoSections() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="historia" className="bg-[#111111] px-5 py-20 text-[#F5F1E8] md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.08fr] md:items-center">
          <div className="v2-scroll-reveal">
            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
              <Image src="/assets/historia.webp" alt="Historická čiernobiela fotografia Amfiteátra Prešov v roku 1966" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <p className="mt-3 text-xs leading-5 text-[#F5F1E8]/45">Amfiteáter v Prešove v roku 1966. Zdroj: fb Krajské múzeum Prešov.</p>
          </div>
          <div className="v2-scroll-reveal">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C8A46B]">História</p>
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] md:text-6xl">História amfiteátra</h2>
            <div className="mt-8 space-y-5 leading-7 text-[#F5F1E8]/68">
              <p>Základný kameň amfiteátra bol položený v roku 1951 pričom neboli použité žiadne bagre alebo buldozéry, ale fúriky, lopaty a čakany. Výstavba prebiehala zväčša brigádnickým spôsobom od jari do jesene. Mladí ľudia tu pracovali v čase školských prázdnin i počas vyučovania, počas pracovných zmien i mimo nich.</p>
              <p>Prvá oficiálna sezóna sa na Amfiteátri začína v roku 1955 letným filmovým festivalom „Filmový Festival Pracujúcich“, ktorý roky patrí medzi najväčšie udalosti v celom prešovskom kraji. O rok neskôr sa končí základná etapa výstavby vrátanie oplotenia Amfiteátra.</p>
              <p>Do konca šesťdesiatych rokov prebieha postupné dobudovávanie priestorov pre divákov, modernizuje sa zázemie pre účinkujúcich, pribúdajú šatne, sociálne zariadenia a bufety. Do roku 2002 sa tu premietajú filmy, opakovane sa organizuje Hudobné Leto, vystúpenia folklórnych súborov aj populárnych interpretov.</p>
              <p>Amfiteáter v tých časoch bol centrom kultúrneho života v Prešove, miestom stretávania mladých ľudí.</p>
              <p className="text-sm text-[#F5F1E8]/45">Milan Országh</p>
            </div>
          </div>
        </div>
      </section>

      <section id="prenajom" className="grid bg-[#313223] text-[#F5F1E8] lg:grid-cols-[0.7fr_1.3fr]">
        <div className="v2-scroll-reveal px-5 py-14 md:px-10 md:py-20 lg:pl-16 lg:pr-12 xl:pl-24 2xl:pl-32">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C8A46B]">Prenájom priestoru</p>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl">Otvorený priestor pre vaše podujatie</h2>
          <div className="mt-7 space-y-5 leading-7 text-[#F5F1E8]/72">
            <p>Amfiteáter je dostupný aj pre veľké kultúrne, spoločenské a komunitné podujatia v open-air priestore priamo v Prešove.</p>
            <p>Open-air javisko, mestský park, letné kino, architektonická atmosféra a dostupnosť priamo v meste vytvárajú flexibilný priestor pre koncerty, festivaly, firemné akcie aj komunitné stretnutia.</p>
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden bg-[#111111] md:min-h-[380px] lg:min-h-[460px]">
          <Image src="/assets/Amfiteater-Presov_XH24429-1.webp" alt="Široký architektonický pohľad na open-air javisko Amfiteátra Prešov" fill className="v2-image-drift object-cover saturate-[0.86]" sizes="(max-width: 1024px) 100vw, 65vw" />
        </div>
      </section>

      <footer id="kontakt" className="bg-[#1e1f18] px-5 py-12 text-[#F5F1E8] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F1E8]/45">Administratívny kontakt</p>
              <div className="space-y-2 text-sm text-[#F5F1E8]/68">
                <p className="font-medium text-[#F5F1E8]">Občianske združenie Amfiteáter Prešov</p>
                <p>Floriánova 6</p>
                <p>08001 Prešov</p>
                <p>Slovakia</p>
                <p><a className="transition hover:text-[#C8A46B]" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
              </div>
            </div>
            <div className="flex gap-5 text-[#F5F1E8]/62">
              <a className="transition hover:text-[#C8A46B]" href="#program">Program</a>
              <a className="transition hover:text-[#C8A46B]" href="#o-amfiteatri">O amfiteátri</a>
              <a className="transition hover:text-[#C8A46B]" href="#prenajom">Prenájom</a>
            </div>
            <div className="md:text-right">
              <div className="mb-8 text-sm text-[#F5F1E8]/68 md:ml-auto">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F1E8]/45">Prenájom amfiteátra</p>
                <p className="font-medium text-[#F5F1E8]">Miro Tásler</p>
                <p><a className="transition hover:text-[#C8A46B]" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
                <p><a className="transition hover:text-[#C8A46B]" href="tel:+421905273318">+421 905 273 318</a></p>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#F5F1E8]/45 md:ml-auto">Amfiteáter Prešov — koncerty, festivaly, letné kino a kultúrne podujatia v Prešove.</p>
              <div className="mt-8 text-sm text-[#F5F1E8]/45">Copyright {currentYear} Amfiteáter Prešov. Made by PI LAB</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default async function V2Page() {
  const { upcoming, archive } = await getEvents();

  return (
    <main className={`${geist.variable} ${inter.variable} bg-[#F2EFE8] font-[var(--font-v2-sans)] text-[#111111]`}>
      <div className="[&_h1]:font-[var(--font-v2-display)] [&_h2]:font-[var(--font-v2-display)] [&_h3]:font-[var(--font-v2-display)]">
        <Hero hasArchive={archive.length > 0} />
        <EventsSection upcoming={upcoming} archive={archive} />
        <AboutSection />
        <GallerySection />
        <InfoSections />
      </div>
    </main>
  );
}
