import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import StructuredData from "@/components/SEO/StructuredData";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const restaurantId = "dasaraa";

export async function generateMetadata(): Promise<Metadata> {
  const docRef = doc(db, "restaurants", restaurantId, "seo", "homepage");
  const snap = await getDoc(docRef);
  const data = snap.exists() ? snap.data() : {};

  const defaultOgImage = `${process.env.NEXT_PUBLIC_SITE_URL}/default-og-image.png`;

  return {
    title: data.title ?? "Kaaram",
    description: data.description ?? "Delicious South Indian Flavors at Kaaram",
    keywords: Array.isArray(data.keywords)
      ? data.keywords
      : ((data.keywords as string)?.split(",").map((k) => k.trim()) ?? [
          "kaaram",
          "restaurant",
          "spices",
        ]),

    openGraph: {
      title: data.ogTitle ?? data.title,
      description: data.ogDescription ?? data.description,
      url: data.url ?? process.env.NEXT_PUBLIC_SITE_URL,
      siteName: data.siteName ?? "Kaaram",
      images: [{ url: data.image || defaultOgImage }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: data.twitterTitle ?? data.title,
      description: data.twitterDescription ?? data.description,
      images: [data.twitterImage || data.image || defaultOgImage],
    },

    icons: {
      icon: data.faviconUrl || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docRef = doc(db, "restaurants", restaurantId, "seo", "homepage");
  const snap = await getDoc(docRef);
  const data = snap.exists() ? snap.data() : {};

  return (
    <html lang="en">
      <head>
        <StructuredData data={data} />
      </head>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Header restaurantId={restaurantId} />
        <main>{children}</main>
        <Footer restaurantId={restaurantId} />
      </body>
    </html>
  );
}
