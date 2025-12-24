import MenuLandingPage from "@/components/menu/MenuPage";
import React, { Suspense } from "react";
import { getSeoMetadata } from "@/utils/getSeoMetadata";

export async function generateMetadata() {
  return getSeoMetadata("menu");
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <MenuLandingPage />
    </Suspense>
  );
}
