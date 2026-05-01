import type { Metadata } from 'next';
import { siteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Amfiteáter Prešov – koncerty, festivaly a kultúrne podujatia',
  description: 'Oficiálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia pod holým nebom v Prešove.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: siteUrl,
    siteName: 'Amfiteáter Prešov',
    title: 'Amfiteáter Prešov – koncerty, festivaly a kultúrne podujatia',
    description: 'Oficiálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia pod holým nebom v Prešove.',
    images: [
      {
        url: '/assets/hero_1.webp',
        width: 1200,
        height: 630,
        alt: 'Amfiteáter Prešov pod holým nebom'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amfiteáter Prešov – koncerty, festivaly a kultúrne podujatia',
    description: 'Oficiálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia pod holým nebom v Prešove.',
    images: ['/assets/hero_1.webp']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
