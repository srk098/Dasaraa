import FaqPage from "@/components/Catering/FaqPage";
import CateringOurStory from "@/components/Catering/our-story-catering";
import ServicesPage from "@/components/Catering/services";
import AboutHero from "@/components/about/about-hero";
import ContactPage from "@/components/contact/contact";
import { Suspense } from "react";
import Parallax from "@/components/about/parallax";
import UsersView from "@/components/home/usersView";
import { getSeoMetadata } from "@/utils/getSeoMetadata";

export async function generateMetadata() {
  return getSeoMetadata("catering");
}

export default function AboutPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <AboutHero />
      </Suspense>
      <CateringOurStory restaurantId="dasaraa" />
      <UsersView />
      <Parallax />
      {/* <ServicesPage />
      <FaqPage />
      <ContactPage /> */}
    </main>
  );
}
