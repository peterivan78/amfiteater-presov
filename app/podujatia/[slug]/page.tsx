import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/events';
import { buildEventStructuredData, eventDescription, eventUrl } from '@/lib/seo';
import { nbsp } from '@/lib/typography';
import { formatEventDateRange } from '@/lib/utils';

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  const title = `${event.title} – Amfiteáter Prešov`;
  const description = eventDescription(event);
  const url = eventUrl(event);
  const image = event.cover_image_url || event.image_url;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: 'article',
      locale: 'sk_SK',
      url,
      siteName: 'Amfiteáter Prešov',
      title,
      description,
      images: [
        {
          url: image,
          alt: `Vizuál podujatia ${event.title} v Amfiteátri Prešov`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const image = event.cover_image_url || event.image_url;
  const structuredData = {
    '@context': 'https://schema.org',
    ...buildEventStructuredData(event)
  };

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <a className="text-sm text-black/55 transition hover:text-accent" href="/#program">Späť na program</a>
        <div className="mt-8 grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <Image
              src={image}
              alt={`Vizuál podujatia ${event.title} v Amfiteátri Prešov`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 44vw"
              priority
            />
          </div>
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">Podujatie</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{event.title}</h1>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-black/45">Dátum a čas</dt>
                <dd className="mt-1 text-base text-black/75">{event.display_date ?? formatEventDateRange(event.start_at, event.end_at)}</dd>
              </div>
              <div>
                <dt className="text-black/45">Miesto</dt>
                <dd className="mt-1 text-base text-black/75">Amfiteáter Prešov</dd>
              </div>
            </dl>
            {event.short_description ? <p className="mt-8 text-lg leading-8 text-black/70">{nbsp(event.short_description)}</p> : null}
            <section className="mt-10 border-t border-black/10 pt-6" aria-labelledby="prakticke-informacie">
              <h2 id="prakticke-informacie" className="text-2xl font-semibold">Praktické informácie</h2>
              <p className="mt-3 leading-7 text-black/65">
                {nbsp('Podujatie sa koná v open-air priestore Amfiteáter Prešov. Aktuálne informácie sledujte pri podujatí a na oficiálnych predajných miestach vstupeniek, ak sú dostupné.')}
              </p>
            </section>
            {event.ticket_url ? (
              <section className="mt-8 border-t border-black/10 pt-6" aria-labelledby="vstupenky">
                <h2 id="vstupenky" className="text-2xl font-semibold">Vstupenky</h2>
                <a className="mt-4 inline-flex bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent" href={event.ticket_url} target="_blank" rel="noreferrer">
                  Vstupenky / viac info
                </a>
              </section>
            ) : null}
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
        }}
      />
    </main>
  );
}
