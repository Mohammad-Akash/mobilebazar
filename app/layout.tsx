import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

import { SITE_CONFIG } from "@/src/lib/seo/site";

export const metadata: Metadata = {
  // metadataBase makes all OG images and canonical URLs absolute
  metadataBase: new URL(SITE_CONFIG.url),

  // Title template: child pages set their own title, it becomes "Title | MobileBazar"
  title: {
    default: `${SITE_CONFIG.name} — Pakistan's Mobile Phones Marketplace`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  // When indexing is OFF (pre-launch), block all crawlers site-wide
  robots: SITE_CONFIG.allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      }
    : {
        index: false,
        follow: false,
        noarchive: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
        },
      },

  // Default Open Graph for pages that don't override
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: "en_PK",
    images: [{ url: SITE_CONFIG.defaultOgImage, width: 1200, height: 630 }],
  },

  // Twitter card defaults
  twitter: {
    card: "summary_large_image",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Suspense fallback={<header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
