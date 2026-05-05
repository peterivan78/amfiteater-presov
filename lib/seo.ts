import type { EventItem } from '@/lib/types';
import { siteTimeZone, toSlug } from '@/lib/utils';

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

export function eventYear(event: EventItem) {
  return new Intl.DateTimeFormat('sk-SK', { timeZone: siteTimeZone, year: 'numeric' }).format(new Date(event.start_at));
}

export function eventType(event: EventItem) {
  const title = event.title.toLowerCase();

  if (title.includes('kavej') || title.includes('kino') || title.includes('film')) {
    return 'letné kino';
  }

  if (title.includes('festival') || title.includes('žije') || title.includes('hip hop')) {
    return 'festival';
  }

  return 'koncert';
}

export function eventImageAlt(event: EventItem) {
  if (event.title.toLowerCase().includes('imt smile')) {
    return 'IMT Smile koncert Amfiteáter Prešov 2026';
  }

  return `${event.title} Amfiteáter Prešov ${eventYear(event)}`;
}

export function eventMetaTitle(event: EventItem) {
  if (event.title.toLowerCase().includes('imt smile')) {
    return 'IMT Smile Prešov 2026 – koncert Amfiteáter Prešov';
  }

  return `${event.title} Prešov ${eventYear(event)} – Amfiteáter Prešov`;
}

export function eventMetaDescription(event: EventItem) {
  return `${event.title} v Amfiteátri Prešov. Dátum, čas, miesto, vstupenky a praktické informácie k podujatiu.`;
}

export function eventAboutParagraphs(event: EventItem) {
  const title = event.title;
  const type = eventType(event);

  if (title.toLowerCase().includes('imt smile')) {
    return [
      'IMT Smile sa vracajú do Prešova s letným open-air koncertom v priestore Amfiteáter Prešov. Domáce publikum, veľké pódium a atmosféra amfiteátra vytvárajú prirodzené miesto pre jeden z hlavných koncertov sezóny.',
      'Koncert IMT Smile v Prešove sa uskutoční v piatok 26. júna 2026. Súčasťou večera budú aj hostia Kali a Peter Pann.'
    ];
  }

  if (type === 'letné kino') {
    return [
      `${title} prináša do priestoru Amfiteáter Prešov letné kino pod holým nebom v meste Prešov. Filmový večer je súčasťou sezónneho programu, ktorý spája kino, parkovú atmosféru a mestskú dostupnosť.`,
      `Letné kino ${title} v Prešove vytvára pokojný večerný formát pre návštevníkov, ktorí chcú zažiť film mimo klasickej kinosály priamo v open-air priestore Amfiteátra Prešov.`
    ];
  }

  if (type === 'festival') {
    return [
      `${title} je festival v open-air priestore Amfiteáter Prešov v meste Prešov. Program využíva veľké pódium, letnú atmosféru a charakter amfiteátra ako prirodzeného miesta pre väčšie kultúrne podujatia.`,
      `Festival ${title} v Prešove patrí medzi podujatia sezóny, pri ktorých Amfiteáter Prešov ponúka priestor pre hudbu, publikum a spoločný zážitok pod holým nebom.`
    ];
  }

  return [
    `${title} je koncert v priestore Amfiteáter Prešov v meste Prešov. Open-air prostredie amfiteátra dáva podujatiu letnú atmosféru a prirodzené zázemie pre večer pod holým nebom.`,
    `Koncert ${title} v Prešove je súčasťou sezónneho programu, ktorý v Amfiteátri Prešov prepája hudbu, mestský park a kultúrny priestor s dlhou tradíciou.`
  ];
}

export function eventPerformers(event: EventItem) {
  if (event.title.toLowerCase().includes('imt smile')) {
    return ['IMT Smile', 'Kali', 'Peter Pann'];
  }

  return [];
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
  return event.short_description || eventAboutParagraphs(event).join(' ');
}

export function buildEventStructuredData(event: EventItem) {
  const performers = eventPerformers(event);

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
    ...(performers.length
      ? {
          performer: performers.map((name) => ({
            '@type': name === 'IMT Smile' ? 'MusicGroup' : 'Person',
            name
          }))
        }
      : {}),
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
        '@type': ['Place', 'EventVenue'],
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
