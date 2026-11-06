import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MobileBazar — Pakistan's Mobile Phones Marketplace",
  description: "Buy and sell mobile phones across Pakistan with PTA verification, genuine specs and trusted sellers.",
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
