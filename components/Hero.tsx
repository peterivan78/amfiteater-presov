import Image from 'next/image';

export function Hero({ hasArchive = false }: { hasArchive?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero_1.webp"
          alt="Amfiteáter Prešov"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-between px-5 py-6 md:px-8 md:py-8">
        <nav className="relative z-10 flex items-center justify-between gap-6 text-sm">
          <a href="/" className="flex items-center">
            <Image
              src="/assets/logo.svg"
              alt="Amfiteáter Prešov"
              width={228}
              height={60}
              className="h-12 w-auto md:h-14"
            />
          </a>
          <div className="hidden gap-6 md:flex">
            <a href="#program">Podujatia</a>
            <a href="#o-amfiteatri">O amfiteátri</a>
            {hasArchive ? <a href="#archiv">Archív</a> : null}
            <a href="#kontakt">Kontakt</a>
          </div>
        </nav>
        <div className="relative z-10 max-w-4xl py-20">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-white/60">Kultúrny priestor pod holým nebom</p>
          <p className="font-display text-6xl tracking-[0.02em] md:text-8xl">Amfiteáter Prešov</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Letné koncerty, filmové večery, festivaly a komunitné podujatia v priestore, ktorý patrí prešovčanom.
          </p>
        </div>
      </div>
    </section>
  );
}
