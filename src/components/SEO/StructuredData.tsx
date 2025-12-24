// app/seo/structuredData.tsx
import React from "react";

export default function StructuredData({ data }: { data: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: data?.title,
    image: data?.image,
    telephone: data?.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: data?.address?.street,
      addressLocality: data?.address?.city,
      addressRegion: data?.address?.region,
      postalCode: data?.address?.postalCode,
      addressCountry: data?.address?.country,
    },
    url: data?.url,
    description: data?.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
