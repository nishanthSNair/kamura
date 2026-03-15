import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
    "The world's first unbiased wellness intelligence platform. 70+ treatments scored on evidence, safety, and community data. 69+ UAE clinics. Transparent methodology, zero bias.",
  keywords: [
    "wellness treatments scored",
    "longevity treatments dubai",
    "biohacking dubai",
    "peptide therapy dubai",
    "hijama dubai",
    "NAD therapy dubai",
    "cryotherapy dubai",
    "rapamycin longevity",
    "PRP therapy UAE",
    "wellness clinics dubai",
    "kamura score",
    "treatment evidence review",
    "holistic healing UAE",
    "red light therapy dubai",
    "IV therapy dubai",
  ],
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
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "KAMURA — Heart of Longevity & Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAMURA — Heart of Longevity & Wellness",
    description:
      "Discover the practices, places, and people transforming wellness in Dubai and beyond.",
    creator: "@kamaborea",
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
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('kamura-theme');if(s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})();`,
          }}
        />
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
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
