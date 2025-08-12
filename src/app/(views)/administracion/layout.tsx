import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flora Cordeiro Inmobiliaria",
  description: "Created by Magno",
  icons: {
    icon: '/logos/footerLogo.png',
  },
};
// src/app/Administration/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

