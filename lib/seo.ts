import type { EventItem } from '@/lib/types';

export const siteUrl = 'https://amfiteater-presov.vercel.app';

export const faqItems = [
  {
    question: 'Ako sa dostanem do Amfiteátra Prešov?',
    answer: 'Amfiteáter sa nachádza v meste Prešov a je dostupný autom, MHD aj pešo z centra mesta.'
  },
  {
    question: 'Je v areáli možné parkovanie?',
    answer: 'V okolí amfiteátra sú dostupné parkovacie možnosti podľa typu podujatia.'
  },
  {
    question: 'Je možné platiť kartou?',
    answer: 'Na väčšine podujatí je možné platiť kartou. Konkrétne informácie nájdete pri jednotlivých eventoch.'
  },
  {
    question: 'Kde nájdem aktuálny program?',
    answer: 'Aktuálny program koncertov, festivalov a ďalších podujatí nájdete priamo na tejto stránke.'
  },
  {
    question: 'Konajú sa v amfiteátri aj filmové projekcie?',
    answer: 'Áno. Súčasťou programu sú aj letné kino projekcie a špeciálne filmové podujatia.'
  }
];

const organizationId = `${siteUrl}/#organization`;
const placeId = `${siteUrl}/#place`;

export function buildStructuredData(events: EventItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Občianske združenie Amfiteáter Prešov',
        url: siteUrl,
        email: 'info@amfiteaterpresov.sk',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Floriánova 6',
          addressLocality: 'Prešov',
          postalCode: '08001',
          addressCountry: 'SK'
        }
      },
      {
        '@type': 'Place',
        '@id': placeId,
        name: 'Amfiteáter Prešov',
        description:
          'Ikonický open-air kultúrny priestor v Prešove určený pre koncerty, festivaly, letné kino a veľké spoločenské podujatia.',
        url: siteUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Prešov',
          addressCountry: 'SK'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      },
      ...events.map((event) => ({
        '@type': 'Event',
        '@id': `${siteUrl}/#event-${event.slug}`,
        name: event.title,
        description: event.short_description || `Podujatie ${event.title} v Amfiteátri Prešov.`,
        startDate: event.start_at,
        ...(event.end_at ? { endDate: event.end_at } : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        image: [event.cover_image_url || event.image_url],
        url: siteUrl,
        location: {
          '@id': placeId
        },
        organizer: {
          '@id': organizationId
        },
        ...(event.ticket_url
          ? {
              offers: {
                '@type': 'Offer',
                url: event.ticket_url,
                availability: 'https://schema.org/InStock'
              }
            }
          : {})
      }))
    ]
  };
}
