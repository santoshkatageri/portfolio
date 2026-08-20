import type { Metadata, Viewport } from 'next';
import { content } from '@/content/site';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MotionProvider from '@/components/MotionProvider';
import '@fontsource-variable/inter/index.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';

/**
 * Fonts are self-hosted through @fontsource packages: no runtime requests,
 * works identically on the static export. Inter Variable covers the
 * interface; Instrument Serif (italic) covers editorial display headings.
 */

const { profile } = content;

const description =
  'Santosh Katageri — Senior Member of Technical Staff for Cloud and DevOps at Oracle. A personal engineering platform: selected work, technical writing, and an ongoing lab of experiments across cloud, DevOps and AI.';

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.positioning}`,
    template: `%s — ${profile.brand}`,
  },
  description,
  applicationName: profile.brand,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: profile.siteUrl,
    siteName: profile.brand,
    title: `${profile.name} — ${profile.positioning}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.positioning}`,
    description,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sayHi = content.links.find((link) => link.primary) ?? content.links[0];

  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader
            brand={profile.brand}
            name={profile.name}
            sayHiHref={sayHi?.href}
          />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
