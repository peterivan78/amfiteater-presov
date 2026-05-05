import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/events';
import {
  buildEventStructuredData,
  eventAboutParagraphs,
  eventImageAlt,
  eventMetaDescription,
  eventMetaTitle,
  eventType,
  eventUrl
} from '@/lib/seo';
import { nbsp } from '@/lib/typography';
import type { EventItem } from '@/lib/types';
import { formatDateTime, formatEventDateRange } from '@/lib/utils';

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = 'force-dynamic';

function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildEventFaq(event: EventItem) {
  const type = eventType(event);

  return [
    {
      question: 'Kde sa podujatie koná?',
      answer: 'Podujatie sa koná v priestore Amfiteáter Prešov.'
    },
    {
      question: 'Kedy sa podujatie začína?',
      answer: `${capitalizeFirst(type)} ${event.title} sa začína ${formatDateTime(event.start_at)}.`
    },
    {
      question: 'Kde nájdem vstupenky?',
      answer: event.ticket_url
        ? 'Vstupenky sú dostupné cez odkaz „Vstupenky / viac info“, ak je pri podujatí uvedený.'
        : 'Ak sú vstupenky dostupné, nájdete ich pri podujatí alebo na oficiálnom predajnom mieste.'
    },
    {
      question: 'Je podujatie vonku?',
      answer: 'Áno, ide o open-air podujatie v Amfiteátri Prešov.'
    }
  ];
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {};
  }

  const title = eventMetaTitle(event);
  const description = eventMetaDescription(event);
  const url = eventUrl(event);
  const image = event.cover_image_url || event.image_url;
  const imageAlt = eventImageAlt(event);

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
          alt: imageAlt
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
  const imageAlt = eventImageAlt(event);
  const aboutParagraphs = eventAboutParagraphs(event);
  const faqItems = buildEventFaq(event);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      buildEventStructuredData(event),
      {
        '@type': 'FAQPage',
        '@id': `${eventUrl(event)}#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  };

  return (
    <main>
      <article className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <Link className="text-sm text-black/55 transition hover:text-accent" href="/#program">Späť na program</Link>
        <div className="mt-8 grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <Image
              src={image}
              alt={imageAlt}
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
                <dd className="mt-1 text-base text-black/75">{formatEventDateRange(event.start_at, event.end_at)}</dd>
              </div>
              <div>
                <dt className="text-black/45">Miesto</dt>
                <dd className="mt-1 text-base text-black/75">Amfiteáter Prešov</dd>
              </div>
            </dl>
            {event.short_description ? <p className="mt-8 text-lg leading-8 text-black/70">{nbsp(event.short_description)}</p> : null}
            <section className="mt-10 border-t border-black/10 pt-6" aria-labelledby="o-podujati">
              <h2 id="o-podujati" className="text-2xl font-semibold">O podujatí</h2>
              <div className="mt-4 space-y-4 leading-7 text-black/65">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{nbsp(paragraph)}</p>
                ))}
              </div>
            </section>
            <section className="mt-10 border-t border-black/10 pt-6" aria-labelledby="prakticke-informacie">
              <h2 id="prakticke-informacie" className="text-2xl font-semibold">Praktické informácie</h2>
              <p className="mt-3 leading-7 text-black/65">
                {nbsp('Podujatie sa koná v open-air priestore Amfiteáter Prešov. Pred návštevou odporúčame skontrolovať aktuálne informácie pri konkrétnom podujatí a na oficiálnom predajnom mieste vstupeniek. V prípade nepriaznivého počasia sledujte pokyny organizátora.')}
              </p>
            </section>
            <section className="mt-8 border-t border-black/10 pt-6" aria-labelledby="casto-kladene-otazky">
              <h2 id="casto-kladene-otazky" className="text-2xl font-semibold">Často kladené otázky</h2>
              <div className="mt-4 divide-y divide-black/10 border-y border-black/10">
                {faqItems.map((item) => (
                  <div key={item.question} className="py-4">
                    <h3 className="text-sm font-semibold">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/62">{nbsp(item.answer)}</p>
                  </div>
                ))}
              </div>
            </section>
            {event.ticket_url ? (
              <section className="mt-8 border-t border-black/10 pt-6" aria-labelledby="vstupenky">
                <h2 id="vstupenky" className="text-2xl font-semibold">Vstupenky</h2>
                <a className="mt-4 inline-flex bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent" href={event.ticket_url} target="_blank" rel="noreferrer">
                  Vstupenky / viac info
                </a>
              </section>
            ) : null}
            <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-6 text-sm text-black/55" aria-label="Súvisiace odkazy">
              <Link className="transition hover:text-accent" href="/#program">Späť na program</Link>
              <Link className="transition hover:text-accent" href="/program">Ďalšie podujatia v Amfiteátri Prešov</Link>
            </nav>
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
