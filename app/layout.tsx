import type { Metadata, Viewport } from 'next';
import { content } from '@/content/site';
import './globals.css';

/**
 * Typography ships with zero web-font requests: the site uses the platform UI
 * stack (SF Pro / Segoe UI / Roboto) and the platform mono stack, defined in
 * globals.css. To switch to a hosted face later, add `next/font` here and set
 * the --font-sans / --font-mono variables on <html>.
 */

const { profile } = content;

const description =
  'Portfolio of Santhosh Katageri — Senior Member of Technical Staff for Cloud and DevOps at Oracle. Infrastructure automation across OCI, AWS and GCP, selected projects, and an ongoing lab of experiments and notes.';

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
  themeColor: '#06070a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
