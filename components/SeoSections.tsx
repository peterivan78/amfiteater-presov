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
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-14" aria-labelledby="about-amphitheatre-title">
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
        <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
          {faqItems.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="cursor-pointer list-none font-medium outline-none transition hover:text-accent focus-visible:text-accent">
                <span className="inline-flex w-full items-center justify-between gap-6">
                  {item.question}
                  <span className="text-xl leading-none text-black/35 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 leading-7 text-black/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
