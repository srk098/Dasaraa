// utils/getSeoMetadata.ts
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

const RESTAURANT_ID = "dasaraa";

export async function getSeoMetadata(pageId: string): Promise<Metadata> {
  const docRef = doc(db, "restaurants", RESTAURANT_ID, "seo", pageId);
  const snap = await getDoc(docRef);
  const data = snap.exists() ? snap.data() : {};

  return {
    title: data.title ?? "Restaurant",
    description: data.description ?? "Delicious Indian food.",
    keywords: data.keywords ?? "Kaaram, Indian, Restaurant",
    openGraph: {
      title: data.ogTitle ?? data.title,
      description: data.ogDescription ?? data.description,
      url: data.url ?? "https://sbxmealmates.com",
      images: [{ url: data.image ?? "/og-image.jpg" }],
      siteName: data.siteName ?? "Restaurant",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.twitterTitle ?? data.title,
      description: data.twitterDescription ?? data.description,
      images: [data.twitterImage ?? data.image ?? "/og-image.jpg"],
    },
  };
}
