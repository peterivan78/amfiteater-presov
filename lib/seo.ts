import type { EventItem } from '@/lib/types';
import { toSlug } from '@/lib/utils';

export const siteUrl = 'https://amfiteater-presov.vercel.app';
export const siteHomeUrl = `${siteUrl}/`;

const organizationId = `${siteUrl}/#organization`;
const placeId = `${siteUrl}/#place`;

export function eventUrl(event: EventItem) {
  return `${siteUrl}${eventPath(event)}`;
}

export function eventPath(event: EventItem) {
  return `/podujatia/${publicEventSlug(event)}`;
}

export function publicEventSlug(event: EventItem) {
  const year = new Date(event.start_at).getFullYear();
  const baseSlug = (event.slug || toSlug(event.title)).replace(/-\d{10,}$/, '');

  if (baseSlug.endsWith(`-${year}`)) {
    return baseSlug;
  }

  return `${baseSlug}-${year}`;
}

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

export function eventDescription(event: EventItem) {
  return event.short_description || `Podujatie ${event.title} v Amfiteátri Prešov.`;
}

export function buildEventStructuredData(event: EventItem) {
  return {
    '@type': 'Event',
    '@id': `${eventUrl(event)}#event`,
    name: event.title,
    description: eventDescription(event),
    startDate: event.start_at,
    ...(event.end_at ? { endDate: event.end_at } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [event.cover_image_url || event.image_url],
    url: eventUrl(event),
    location: {
      '@type': 'Place',
      '@id': placeId,
      name: 'Amfiteáter Prešov',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Prešov',
        addressCountry: 'SK'
      }
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
  };
}

export function buildStructuredData(events: EventItem[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Amfiteáter Prešov',
        url: siteHomeUrl,
        inLanguage: 'sk-SK'
      },
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'Amfiteáter Prešov',
        url: siteHomeUrl,
        logo: `${siteUrl}/assets/logo.svg`,
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
          'Open-air kultúrny priestor v Prešove určený pre koncerty, festivaly, letné kino a kultúrne podujatia.',
        url: siteHomeUrl,
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
      ...events.map((event) => buildEventStructuredData(event))
    ]
  };
}
