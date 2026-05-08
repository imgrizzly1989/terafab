import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terafab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TeraFab Atlas",
    template: "%s | TeraFab Atlas",
  },
  description: "Cinematic interactive atlas for TeraFab-scale industrial infrastructure, AI compute, power and construction analysis.",
  keywords: ["TeraFab", "Tesla", "xAI", "AI factory", "Gigafactory", "industrial infrastructure", "data center energy"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030405",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
