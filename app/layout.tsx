import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { MobileBottomNav } from "@/app/components/MobileBottomNav";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

import { SITE_CONFIG } from "@/src/lib/seo/site";

export const metadata: Metadata = {
  // metadataBase makes all OG images and canonical URLs absolute
  metadataBase: new URL(SITE_CONFIG.url),

  // Title template: child pages set their own title, it becomes "Title | MobileBazar"
  title: {
    default: `${SITE_CONFIG.name} — Dedicated Smartphone Marketplace Pakistan`,
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
      className={`${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F6F2] dark:bg-[#0E0D1A] text-[#17152B] dark:text-[#F7F6F2] pb-16 md:pb-0 transition-colors duration-200">
        <Suspense fallback={<header className="h-16 border-b border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF]/80 dark:bg-[#17152B]/80" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <MobileBottomNav />
      </body>
    </html>
  );
}
