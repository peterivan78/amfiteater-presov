import Image from 'next/image';
import Link from 'next/link';
import { nbsp } from '@/lib/typography';

export function Hero({ hasArchive = false }: { hasArchive?: boolean }) {
  return (
    <section className="bg-paper text-[#F5F1E8]">
      <div className="relative overflow-hidden bg-ink">
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
          <Link href="/" className="flex items-center" aria-label="Amfiteáter Prešov">
            <Image
              src="/assets/Amfiteater-Presov_lg-2lines_dark-bg.svg"
              alt="Amfiteáter Prešov"
              width={283}
              height={283}
              className="h-14 w-auto md:h-16"
            />
          </Link>
          <div className="hidden items-center gap-10 md:flex">
            <a className="transition hover:text-accent" href="#program">Program</a>
            <a className="transition hover:text-accent" href="#o-amfiteatri">O amfiteátri</a>
            <a className="transition hover:text-accent" href="#prenajom">Prenájom</a>
            {hasArchive ? <a href="#archiv">Archív</a> : null}
            <a className="transition hover:text-accent" href="#kontakt">Kontakt</a>
            <span className="block h-4 w-6 border-y border-[#F5F1E8]/70" aria-hidden="true" />
          </div>
          </nav>
          <div className="max-w-5xl pb-8 md:pb-14">
          <p className="font-display text-[clamp(2.65rem,7.4vw,7rem)] font-bold leading-[0.88] tracking-[-0.07em]">
            Hudba.<br />Kino.<br />Kultúra.
          </p>
          <div className="mt-5 flex flex-col gap-4 md:mt-8 md:flex-row md:items-end md:gap-10">
            <a className="inline-flex w-fit bg-olive px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F5F1E8] transition hover:bg-rust md:px-7 md:py-4 md:text-[11px]" href="#program">
              Program podujatí
            </a>
            <p className="max-w-md text-xs leading-6 text-[#F5F1E8]/72 md:text-sm md:leading-7">
              {nbsp('Letné koncerty, filmové večery, festivaly a komunitné podujatia v priestore pod holým nebom, ktorý patrí prešovčanom.')}
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
