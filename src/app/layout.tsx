import type { Metadata } from "next";
import './(views)/ui/globals.css';
import { cactus } from "@/app/(views)/ui/fonts";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import WhatsAppRedirection from "@/components/WhatsAppRedirection/WhatsAppRedirection";

export const metadata: Metadata = {
  title: "Flora Cordeiro Inmobiliaria",
  description: "Created by Magno",
  icons: {
    icon: '/logos/footerLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Flora Cordeiro Inmobiliaria",
    "image": "https://flora-cordeiro-inmobiliaria.vercel.app/logos/footerLogo.png",
    "@id": "",
    "url": "https://flora-cordeiro-inmobiliaria.vercel.app/",
    "telephone": "+54 9 2494 208037",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "14 de Julio 796",
      "addressLocality": "Tandil",
      "addressRegion": "Buenos Aires",
      "postalCode": "7000",
      "addressCountry": "AR"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": [
      "https://facebook.com/inmob.flora.cordeiro",
      "https://instagram.com/floracordeiro_inmobiliaria"
    ]
  };

  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="Styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="5XxYTljI-V7ytErFMbV1yrAL6QzawUMcHoEZhvU7iHg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${cactus.className}`}>
        <NavBar />
        {children}
        <WhatsAppRedirection />
        <Footer />
      </body>
    </html>
  );
}
