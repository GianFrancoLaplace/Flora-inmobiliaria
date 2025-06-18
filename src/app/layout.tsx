import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/globals.css";
import {cactus} from "@/app/ui/fonts";
import Footer from "@/components/Footer/Footer";
import WhatsAppRedirection from "@/components/WhatsAppRedirection/WhatsAppRedirection";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flora Cordeiro Inmobiliaria",
  description: "Created by Magno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link rel="stylesheet" href="Styles.css"/>
    </head>

      <body className={`${cactus.className}`}>
        {children}
        <WhatsAppRedirection />
        <Footer />
      </body>

    </html>
  );
}
