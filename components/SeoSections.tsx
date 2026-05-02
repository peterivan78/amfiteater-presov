import { FaqAccordion } from '@/components/FaqAccordion';
import { faqItems } from '@/lib/seo';

export function HomepageIntro() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14" aria-labelledby="homepage-intro-title">
      <div className="max-w-3xl">
        <h1 id="homepage-intro-title" className="text-2xl font-semibold md:text-3xl">Amfiteáter Prešov</h1>
        <p className="mt-4 leading-7 text-black/65">
          Amfiteáter Prešov je ikonický open-air kultúrny priestor v Prešove určený pre koncerty, festivaly, letné kino a veľké spoločenské podujatia. Počas sezóny prináša program domácich aj zahraničných interpretov, filmové projekcie a kultúrne eventy pod holým nebom.
        </p>
      </div>
    </section>
  );
}

export function AboutAmphitheatre() {
  return (
    <section id="o-amfiteatri" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14" aria-labelledby="about-amphitheatre-title">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-accent">O amfiteátri</p>
        <h2 id="about-amphitheatre-title" className="text-3xl font-semibold md:text-5xl">O amfiteátri</h2>
        <p className="mt-5 leading-7 text-black/65">
          Jedno z najvýznamnejších kultúrnych miest v Prešove s tradíciou veľkých koncertov, festivalov a letných podujatí. Amfiteáter ponúka jedinečnú atmosféru open-air priestoru priamo v meste a každoročne hostí tisíce návštevníkov.
        </p>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14" aria-labelledby="faq-title">
      <div className="max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-black/45">FAQ</p>
        <h2 id="faq-title" className="text-3xl font-semibold md:text-5xl">Časté otázky</h2>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
