import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { MobileBottomNav } from "@/app/components/MobileBottomNav";
import { AntiExtensionCleaner } from "@/app/components/AntiExtensionCleaner";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

import { SITE_CONFIG } from "@/src/lib/seo/site";

export const instant = false

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0D1A" },
  ],
}

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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&p)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="min-h-dvh flex flex-col bg-[#F7F6F2] dark:bg-[#0E0D1A] text-[#17152B] dark:text-[#F7F6F2] pb-20 md:pb-0 transition-colors duration-200"
        suppressHydrationWarning
      >
        <AntiExtensionCleaner />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#7657FF] focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold focus:outline-none"
        >
          Skip to main content
        </a>
        <Suspense fallback={<header className="h-16 border-b border-[#E9E7EF] dark:border-[#2D2947] bg-[#FFFFFF]/80 dark:bg-[#17152B]/80" />}>
          <Header />
        </Suspense>
        <main id="main-content" className="flex-1 w-full min-w-0" tabIndex={-1}>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <MobileBottomNav />
        </Suspense>
      </body>
    </html>
  );
}
