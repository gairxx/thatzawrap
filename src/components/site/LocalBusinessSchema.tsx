export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: "Thatz a Wrap",
    image: "https://thatzawrap.com/og.jpg",
    "@id": "https://thatzawrap.com",
    url: "https://thatzawrap.com",
    telephone: "+1-706-987-2484",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4838 Hamilton Rd",
      addressLocality: "Columbus",
      addressRegion: "GA",
      postalCode: "31904",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 32.5364, latitude_note: "approx", longitude: -84.9877 },
    areaServed: ["Columbus GA", "Phenix City AL", "Fort Moore", "Midland", "Smiths Station"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "15:00" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
