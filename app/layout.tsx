import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import { siteHomeUrl, siteUrl } from '@/lib/seo';
import './globals.css';

const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display'
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Amfiteáter Prešov – koncerty, festivaly, letné kino a kultúrne podujatia',
  description: 'Aktuálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia v open-air priestore priamo v Prešove.',
  alternates: {
    canonical: siteHomeUrl
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: siteHomeUrl,
    siteName: 'Amfiteáter Prešov',
    title: 'Amfiteáter Prešov – koncerty, festivaly, letné kino a kultúrne podujatia',
    description: 'Aktuálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia v open-air priestore priamo v Prešove.',
    images: [
      {
        url: '/assets/Amfiteater-Presov-pohlad-na-amfiteater-by-Peter-Ivan-XH24392_v4.webp',
        width: 1200,
        height: 630,
        alt: 'Amfiteáter Prešov pod holým nebom'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amfiteáter Prešov – koncerty, festivaly, letné kino a kultúrne podujatia',
    description: 'Aktuálny program Amfiteátra Prešov. Koncerty, festivaly, letné kino a kultúrne podujatia v open-air priestore priamo v Prešove.',
    images: ['/assets/Amfiteater-Presov-pohlad-na-amfiteater-by-Peter-Ivan-XH24392_v4.webp']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
