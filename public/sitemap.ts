import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { MetadataRoute } from "next";

interface SeoPage {
  slug: string;
  lastModified?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  active: boolean;
}

export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const restaurantId = "dasaraa"; 
  const seoPagesDocRef = doc(db, "restaurants", restaurantId, "sitemap", "sitemap_data");

  const docSnap = await getDoc(seoPagesDocRef);

  if (!docSnap.exists()) {
    console.error("No SEO pages found!");
    return [];
  }

  const { pages } = docSnap.data() as { pages: SeoPage[] };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://localhost:3000";

  const urls: MetadataRoute.Sitemap = pages
    .filter((page) => page.active)
    .map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.lastModified ?? new Date().toISOString(),
      changeFrequency: page.changefreq ?? "monthly",
      priority: page.priority ?? 0.5,
    }));

  return urls;
}
