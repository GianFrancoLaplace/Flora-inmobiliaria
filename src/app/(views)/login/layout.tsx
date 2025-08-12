import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flora Cordeiro Inmobiliaria",
  description: "Created by Magno",
  icons: {
    icon: '/logos/footerLogo.png',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>; 
}

