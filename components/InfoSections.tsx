import Image from 'next/image';

export function InfoSections() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-8 rounded-3xl bg-white p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:p-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/5">
            <Image
              src="/assets/historia.webp"
              alt="Historický pohľad na Amfiteáter Prešov"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold md:text-5xl">Priestor pre kultúru v meste</h2>
            <div className="mt-6 space-y-4 leading-7 text-black/65">
              <p>Amfiteáter Prešov je otvorený priestor pre koncerty, festivaly, kino pod holým nebom a mestské podujatia.</p>
              <p>Text tejto sekcie je zámerne pripravený ako placeholder. Neskôr ho nahradíme finálnym textom o histórii, rekonštrukcii a aktuálnom využití priestoru.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-ink px-5 py-16 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-white/45">Kontakt</p>
            <h2 className="text-3xl font-semibold md:text-5xl">Chcete uverejniť podujatie?</h2>
          </div>
          <div className="space-y-3 text-white/70">
            <p>Amfiteáter Prešov</p>
            <p>Email: doplnit@email.sk</p>
            <p>Telefón: +421 xxx xxx xxx</p>
          </div>
        </div>
      </section>
    </>
  );
}
