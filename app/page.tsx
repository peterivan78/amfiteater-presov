import { Hero } from '@/components/Hero';
import { EventsSection } from '@/components/EventsSection';
import { InfoSections } from '@/components/InfoSections';
import { AboutAmphitheatre, FaqSection, HomepageIntro } from '@/components/SeoSections';
import { getEvents } from '@/lib/events';
import { buildStructuredData } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { upcoming, archive } = await getEvents();
  const structuredData = buildStructuredData([...upcoming, ...archive]);

  return (
    <main>
      <Hero hasArchive={archive.length > 0} />
      <HomepageIntro />
      <EventsSection upcoming={upcoming} archive={archive} />
      <AboutAmphitheatre />
      <FaqSection />
      <InfoSections />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c')
        }}
      />
    </main>
  );
}
