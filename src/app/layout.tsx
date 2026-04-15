import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StackProviderWrapper from "@/components/StackProviderWrapper";
import StackShell from "@/components/stack/StackShell";
import "./globals.css";

const GA_ID = "G-DVKBZLV95P";

const playfair = Playfair_Display({
 variable: "--font-playfair",
 subsets: ["latin"],
 display: "swap",
});

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 display: "swap",
});

export const metadata: Metadata = {
 title: {
 default: "KAMURA — Heart of Longevity & Wellness",
 template: "%s | KAMURA",
 },
 description:
 "The world's first unbiased wellness intelligence platform. 200+ treatments scored on evidence, safety, accessibility, and value. 70+ UAE clinics. Peptide therapy, NAD+, GLP-1, red light therapy, and more — transparently ranked.",
 icons: {
 icon: [
 { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
 { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
 { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
 ],
 apple: "/apple-icon.png",
 },
 metadataBase: new URL("https://kamuralife.com"),
 alternates: {
 canonical: "/",
 },
 openGraph: {
 title: "KAMURA — Heart of Longevity & Wellness",
 description:
 "Discover the practices, places, and people transforming wellness in Dubai and beyond.",
 url: "https://kamuralife.com",
 siteName: "KAMURA",
 locale: "en_US",
 type: "website",
 images: [
 {
 url: "https://kamuralife.com/images/hero-home.png",
 width: 1200,
 height: 630,
 alt: "KAMURA — Rooted in Wellness",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "KAMURA — Heart of Longevity & Wellness",
 description:
 "Discover the practices, places, and people transforming wellness in Dubai and beyond.",
 creator: "@kamuralife",
 },
 verification: {
 google: "TULPYmvCJGmxRx1mLa17Qka0n_Y5jbdg-H-tAe2r65Y",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const siteJsonLd = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 "@id": "https://kamuralife.com/#organization",
 name: "KAMURA",
 url: "https://kamuralife.com",
 logo: {
 "@type": "ImageObject",
 url: "https://kamuralife.com/icon-512.png",
 width: 512,
 height: 512,
 },
 description:
 "Unbiased wellness intelligence platform scoring 200+ longevity and wellness treatments on evidence, safety, accessibility, and value.",
 sameAs: ["https://x.com/kamuralife"],
 },
 {
 "@type": "WebSite",
 "@id": "https://kamuralife.com/#website",
 url: "https://kamuralife.com",
 name: "KAMURA",
 publisher: { "@id": "https://kamuralife.com/#organization" },
 inLanguage: "en",
 },
 ],
 };

 return (
 <html lang="en">
 <head>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
 />
 <link rel="preconnect" href="https://images.unsplash.com" />
 <link rel="dns-prefetch" href="https://images.unsplash.com" />
 <link rel="preconnect" href="https://www.googletagmanager.com" />
 <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
 <link rel="alternate" type="application/rss+xml" title="KAMURA Blog" href="/rss.xml" />
 <Script
 src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
 strategy="afterInteractive"
 />
 <Script id="google-analytics" strategy="afterInteractive">
 {`
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${GA_ID}');
 `}
 </Script>
 </head>
 <body className={`${playfair.variable} ${inter.variable} antialiased`}>
 <StackProviderWrapper>
 <Navigation />
 <main>{children}</main>
 <Footer />
 <StackShell />
 </StackProviderWrapper>
 <Analytics />
 <SpeedInsights />
 </body>
 </html>
 );
}
