import Image from 'next/image';

export function InfoSections() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-8 rounded-lg bg-white p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:p-12">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/5">
              <Image
                src="/assets/historia.webp"
                alt="Historický pohľad na Amfiteáter Prešov"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-black/45">Amfiteáter v Prešove v roku 1966. Zdroj: fb Krajské múzeum Prešov.</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">História amfiteátra</h2>
            <div className="mt-6 space-y-4 leading-7 text-black/65">
              <p>Základný kameň amfiteátra bol položený v roku 1951 pričom neboli použité žiadne bagre alebo buldozéry, ale fúriky, lopaty a čakany. Výstavba prebiehala zväčša brigádnickým spôsobom od jari do jesene. Mladí ľudia tu pracovali v čase školských prázdnin i počas vyučovania, počas pracovných zmien i mimo nich.</p>
              <p>Prvá oficiálna sezóna sa na Amfiteátri začína v roku 1955 letným filmovým festivalom „Filmový Festival Pracujúcich“, ktorý roky patrí medzi najväčšie udalosti v celom prešovskom kraji. O rok neskôr sa končí základná etapa výstavby vrátanie oplotenia Amfiteátra.</p>
              <p>Do konca šesťdesiatych rokov prebieha postupné dobudovávanie priestorov pre divákov, modernizuje sa zázemie pre účinkujúcich, pribúdajú šatne, sociálne zariadenia a bufety. Do roku 2002 sa tu premietajú filmy, opakovane sa organizuje Hudobné Leto, vystúpenia folklórnych súborov aj populárnych interpretov.</p>
              <p>Amfiteáter v tých časoch bol centrom kultúrneho života v Prešove, miestom stretávania mladých ľudí.</p>
              <p className="text-sm text-black/45">Milan Országh</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="kontakt" className="bg-ink px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/45">Administratívny kontakt</p>
              <div className="space-y-2 text-white/72">
                <p className="font-medium text-white">Občianske združenie Amfiteáter Prešov</p>
                <p>Floriánova 6</p>
                <p>08001 Prešov</p>
                <p>Slovakia</p>
                <p><a className="transition hover:text-accent" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/45">Prenájom amfiteátra</p>
              <div className="space-y-2 text-white/72">
                <p className="font-medium text-white">Miro Tásler</p>
                <p><a className="transition hover:text-accent" href="mailto:info@amfiteaterpresov.sk">info@amfiteaterpresov.sk</a></p>
                <p><a className="transition hover:text-accent" href="tel:+421905273318">+421 905 273 318</a></p>
              </div>
            </div>
          </div>
          <p className="mt-12 max-w-2xl text-sm leading-6 text-white/45">
            Amfiteáter Prešov — koncerty, festivaly, letné kino a kultúrne podujatia v Prešove.
          </p>
          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/45">Copyright {currentYear} Amfiteáter Prešov. Made by PI LAB</div>
        </div>
      </footer>
    </>
  );
}
