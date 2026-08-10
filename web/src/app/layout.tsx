import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MainNav } from "@/components/layout/main-nav";
import { PromoBanner } from "@/components/layout/promo-banner";
import { SiteHeader } from "@/components/layout/site-header";
import { getMessages } from "@/messages";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BARBOFUS",
    template: "%s — BARBOFUS",
  },
  description: "La communauté des skins Dofus.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PromoBanner />
        <SiteHeader />
        <MainNav t={getMessages()} />
        {children}
      </body>
    </html>
  );
}
