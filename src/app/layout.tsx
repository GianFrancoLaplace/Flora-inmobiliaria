import type { Metadata } from "next";
import "./ui/globals.css";
import {cactus} from "@/app/ui/fonts";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import WhatsAppRedirection from "@/components/WhatsAppRedirection/WhatsAppRedirection";


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
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>
        <body className={`${cactus.className}`}>
        <Nav/>

                {children}

                <WhatsAppRedirection/>
                <Footer/>
            </body>
        </html>
    );
}
