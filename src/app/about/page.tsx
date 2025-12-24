// import Events from "@/components/about/Events";
import AboutHero from "@/components/about/about-hero";
import OurStory from "@/components/about/our-story";
import Parallax from "@/components/about/parallax";
import StaffSection from "@/components/about/staff";
import Stats from "@/components/about/stats";
import ReservationSection from "@/components/home/reservation";

import { Suspense } from "react";
import { getSeoMetadata } from "@/utils/getSeoMetadata";

export async function generateMetadata() {
  return getSeoMetadata("about");
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      
      {/* HERO */}
      <Suspense fallback={<div>Loading...</div>}>
        <AboutHero />
      </Suspense>

      {/* RESERVATION SECTION */}
      <ReservationSection />
      
 {/* PARALLAX SCROLL BACKDROP */}
      <Parallax />

      {/* OUR STORY */}
      <OurStory />

      {/* EVENTS */}
      {/* <Events restaurantId="dasaraa" /> */}

     



      {/* STATS COUNTER SECTION */}
      <Stats />

      {/* STAFF SECTION */}
      <StaffSection restaurantId="dasaraa" />
    </main>
  );
}
