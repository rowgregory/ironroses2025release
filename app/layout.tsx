import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theironroses.info"),
  title: "The Iron Roses",
  description:
    "The Iron Roses’ new EP, Agitpop, delivers bold, emotionally charged punk anthems for those craving change, connection, and radical hope.",
  keywords: [
    "The Iron Roses",
    "Agitpop EP",
    "punk rock",
    "riot grrrl",
    "feminist punk",
    "political punk music",
    "independent band",
    "new punk music",
    "punk anthems",
    "activist music",
    "emotive punk rock",
    "hardcore punk",
    "female-fronted punk",
    "queer punk",
    "radical music",
    "punk EP release",
    "music for change",
    "underground punk",
    "DIY music scene",
    "punk tour dates",
    "punk band from USA",
    "The Iron Roses tour",
    "Agitpop streaming",
    "bandcamp punk",
    "punk community",
  ],
  openGraph: {
    title: "The Iron Roses – Agitpop",
    description:
      "Agitpop is the latest EP from The Iron Roses – a raw, passionate collection of songs about struggle, resistance, and hope.",
    url: "https://theironroses.info",
    siteName: "The Iron Roses",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/coastal-referral-exchange.firebasestorage.app/o/images%2Fthe-iron-roses-rich-preview.png?alt=media&token=6939b1da-23e9-455d-b119-7cda063397a5",
        width: 1200,
        height: 630,
        alt: "The Iron Roses Agitpop cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "The Iron Roses",
  appleWebApp: {
    title: "The Iron Roses",
    statusBarStyle: "default",
    capable: true,
  },
  alternates: {
    canonical: "https://theironroses.info",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
