import Image from 'next/image';
import { nbsp } from '@/lib/typography';

export function HomepageIntro() {
  return (
    <section id="o-amfiteatri" className="grid bg-olive text-[#F5F1E8] lg:grid-cols-[0.62fr_0.38fr]" aria-labelledby="homepage-intro-title">
      <div className="relative min-h-[360px] overflow-hidden bg-ink md:min-h-[520px]">
        <Image
          src="/assets/Amfiteater-Presov-Park-pri-vstupe_XH24403-1.webp"
          alt="Parková atmosféra pri vstupe do Amfiteátra Prešov"
          fill
          className="image-drift object-cover saturate-[0.86]"
          sizes="(max-width: 1024px) 100vw, 62vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/72 via-ink/28 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-xl px-5 pb-10 md:px-10 md:pb-12 lg:px-16">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">O amfiteátri</p>
          <h1 id="homepage-intro-title" className="text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">Viac než len pódium.</h1>
        </div>
      </div>
      <div className="scroll-reveal px-5 py-14 md:px-10 md:py-20 lg:px-12 xl:px-14">
        <div className="max-w-md space-y-5 text-lg leading-8 text-[#F5F1E8]/72">
          <p>{nbsp('Amfiteáter Prešov je ikonický mestský kultúrny park pod holým nebom. Priestor pre koncerty, festivaly, letné kino a večery, na ktoré sa nezabúda.')}</p>
          <p>{nbsp('Počas sezóny prináša hudbu domácich aj zahraničných interpretov, filmové projekcie a kultúrne podujatia v atmosfére, ktorú nikde inde v Prešove nenájdete.')}</p>
        </div>
      </div>
    </section>
  );
}
