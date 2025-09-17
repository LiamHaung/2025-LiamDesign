import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, Noto_Sans_TC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const zpix = localFont({
  src: "../../public/zpix.ttf",
  variable: "--font-zpix",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liam Design Studio | 專業品牌設計與視覺傳達",
  description: "Liam Design Studio 專注於品牌設計與視覺傳達，提供品牌識別、插畫設計、數位設計等服務。來自宜蘭的設計工作室，用創意打造令人印象深刻的品牌體驗。",
  keywords: [
    "品牌設計", "視覺設計", "Logo設計", "插畫設計", "平面設計", 
    "品牌識別", "視覺傳達", "設計工作室", "宜蘭設計", "台灣設計",
    "Brand Design", "Visual Design", "Illustration", "Graphic Design",
    "Liam Design Studio", "Taiwan Design", "Creative Studio"
  ],
  authors: [{ name: "Liam Design Studio" }],
  creator: "Liam Design Studio",
  publisher: "Liam Design Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://2025-liam-design.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/DS-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://2025-liam-design.vercel.app",
    title: "Liam Design Studio | 專業品牌設計與視覺傳達",
    description: "專注於品牌設計與視覺傳達，用創意打造令人印象深刻的品牌體驗。來自宜蘭的設計工作室。",
    siteName: "Liam Design Studio",
    images: [
      {
        url: "/cursor-07.png",
        width: 1200,
        height: 630,
        alt: "Liam Design Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liam Design Studio | 專業品牌設計與視覺傳達",
    description: "專注於品牌設計與視覺傳達，用創意打造令人印象深刻的品牌體驗。",
    images: ["/cursor-07.png"],
    creator: "@liamdesignstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Liam Design Studio",
    "alternateName": "廖設計工作室",
    "description": "專注於品牌設計與視覺傳達的創意工作室，提供品牌識別、插畫設計、數位設計等專業服務",
    "url": "https://2025-liam-design.vercel.app",
    "logo": "https://2025-liam-design.vercel.app/cursor-07.png",
    "image": "https://2025-liam-design.vercel.app/cursor-07.png",
    "foundingDate": "2024",
    "foundingLocation": {
      "@type": "Place",
      "name": "宜蘭, 台灣"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TW",
      "addressRegion": "宜蘭縣"
    },
    "sameAs": [
      "https://www.instagram.com/liamdesignstudio",
      "https://www.facebook.com/liamdesignstudio",
      "https://www.behance.net/liamdesignstudio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Chinese", "English"]
    },
    "serviceArea": {
      "@type": "Place",
      "name": "台灣"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "設計服務",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "品牌識別設計",
            "description": "Logo設計、品牌視覺系統建立"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "插畫設計",
            "description": "商業插畫、角色設計、視覺插畫"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "數位設計",
            "description": "網站設計、UI/UX設計、數位媒體設計"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "平面設計",
            "description": "印刷品設計、包裝設計、廣告設計"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50"
    },
    "keywords": "品牌設計, 視覺設計, Logo設計, 插畫設計, 平面設計, 宜蘭設計工作室"
  };

  return (
    <html lang="zh-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} ${notoSansTC.variable} ${zpix.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
