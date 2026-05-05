import type { Metadata } from 'next';
import ProgramPage from '@/app/program/page';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Podujatia – Amfiteáter Prešov',
  description: 'Aktuálne podujatia v Amfiteátri Prešov. Koncerty, festivaly, letné kino a kultúrny program v Prešove.',
  alternates: {
    canonical: `${siteUrl}/podujatia`
  }
};

export default ProgramPage;
