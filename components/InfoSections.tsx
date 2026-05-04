import Image from 'next/image';
import { nbsp } from '@/lib/typography';
import { GalleryLightbox } from './GalleryLightbox';

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

export function AtmosphereGallery() {
  return (
    <section id="atmosfera" className="scroll-reveal bg-paper px-5 py-10 md:px-8 md:py-12" aria-labelledby="atmosphere-title">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-8">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">Fotogaléria / atmosféra</p>
          <h2 id="atmosphere-title" className="text-3xl font-semibold leading-none tracking-[-0.05em] md:text-4xl">Atmosféra miesta</h2>
        </div>
        <p className="hidden max-w-xs text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 md:block">Zobraziť galériu</p>
      </div>
      <div className="mx-auto max-w-7xl">
        <GalleryLightbox images={galleryImages} />
      </div>
    </section>
  );
}

export function InfoSections() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section id="historia" className="bg-ink px-5 py-20 text-[#F5F1E8] md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.08fr] md:items-center">
          <div className="scroll-reveal">
            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
              <Image
                src="/assets/historia.webp"
                alt="Historická čiernobiela fotografia Amfiteátra Prešov v roku 1966"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-[#F5F1E8]/45">Amfiteáter v Prešove v roku 1966. Zdroj: fb Krajské múzeum Prešov.</p>
          </div>
          <div className="scroll-reveal">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">História</p>
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] md:text-6xl">História amfiteátra</h2>
            <div className="mt-8 space-y-5 leading-7 text-[#F5F1E8]/68">
              <p>{nbsp('Základný kameň amfiteátra bol položený v roku 1951 pričom neboli použité žiadne bagre alebo buldozéry, ale fúriky, lopaty a čakany. Výstavba prebiehala zväčša brigádnickým spôsobom od jari do jesene. Mladí ľudia tu pracovali v čase školských prázdnin i počas vyučovania, počas pracovných zmien i mimo nich.')}</p>
              <p>{nbsp('Prvá oficiálna sezóna sa na Amfiteátri začína v roku 1955 letným filmovým festivalom „Filmový Festival Pracujúcich“, ktorý roky patrí medzi najväčšie udalosti v celom prešovskom kraji. O rok neskôr sa končí základná etapa výstavby vrátanie oplotenia Amfiteátra.')}</p>
              <p>{nbsp('Do konca šesťdesiatych rokov prebieha postupné dobudovávanie priestorov pre divákov, modernizuje sa zázemie pre účinkujúcich, pribúdajú šatne, sociálne zariadenia a bufety. Do roku 2002 sa tu premietajú filmy, opakovane sa organizuje Hudobné Leto, vystúpenia folklórnych súborov aj populárnych interpretov.')}</p>
              <p>{nbsp('Amfiteáter v tých časoch bol centrom kultúrneho života v Prešove, miestom stretávania mladých ľudí.')}</p>
              <p className="text-sm text-[#F5F1E8]/45">Milan Országh</p>
            </div>
          </div>
        </div>
      </section>

      <section id="prenajom" className="grid bg-olive text-[#F5F1E8] lg:grid-cols-[0.7fr_1.3fr]" aria-labelledby="rental-title">
        <div className="scroll-reveal order-2 px-5 py-14 md:px-10 md:py-20 lg:order-1 lg:pl-16 lg:pr-12 xl:pl-24 2xl:pl-32">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Prenájom priestoru</p>
          <div className="mt-7 space-y-5 leading-7 text-[#F5F1E8]/72">
            <p>{nbsp('Amfiteáter je dostupný aj pre veľké kultúrne, spoločenské a komunitné podujatia v open-air priestore priamo v Prešove.')}</p>
            <p>{nbsp('Open-air javisko, mestský park, letné kino, architektonická atmosféra a dostupnosť priamo v meste vytvárajú flexibilný priestor pre koncerty, festivaly, firemné akcie aj komunitné stretnutia.')}</p>
          </div>
        </div>
        <div className="relative order-1 min-h-[300px] overflow-hidden bg-ink md:min-h-[380px] lg:order-2 lg:min-h-[460px]">
          <Image
            src="/assets/Amfiteater-Presov_XH24429-1.webp"
            alt="Široký architektonický pohľad na open-air javisko Amfiteátra Prešov"
            fill
            className="image-drift object-cover saturate-[0.86]"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/24 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-3xl px-5 pb-10 md:px-10 md:pb-12 lg:px-14">
            <h2 id="rental-title" className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-6xl">Otvorený priestor pre vaše podujatie</h2>
          </div>
        </div>
      </section>

      <footer id="kontakt" className="bg-footer px-5 py-12 text-[#F5F1E8] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F1E8]/45">Administratívny kontakt</p>
              <div className="space-y-2 text-sm text-[#F5F1E8]/68">
                <p className="font-medium text-[#F5F1E8]">Občianske združenie Amfiteáter Prešov</p>
                <p>Floriánova 6</p>
                <p>08001 Prešov</p>
                <p>Slovakia</p>
                <p><a className="transition hover:text-accent" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
              </div>
            </div>
            <div className="flex gap-5 text-[#F5F1E8]/62">
              <a className="transition hover:text-accent" href="#program">Program</a>
              <a className="transition hover:text-accent" href="#o-amfiteatri">O amfiteátri</a>
              <a className="transition hover:text-accent" href="#prenajom">Prenájom</a>
            </div>
            <div className="md:text-right">
              <div className="mb-8 text-sm text-[#F5F1E8]/68 md:ml-auto">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F5F1E8]/45">Prenájom amfiteátra</p>
                <p className="font-medium text-[#F5F1E8]">Miro Tásler</p>
                <p><a className="transition hover:text-accent" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
                <p><a className="transition hover:text-accent" href="tel:+421905273318">+421 905 273 318</a></p>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#F5F1E8]/45 md:ml-auto">
                Amfiteáter Prešov — koncerty, festivaly, letné kino a kultúrne podujatia v Prešove.
              </p>
              <div className="mt-8 text-sm text-[#F5F1E8]/45">Copyright {currentYear} Amfiteáter Prešov. Made by PI LAB</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
