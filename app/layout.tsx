import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export const metadata: Metadata = {
  title: {
    default: "My Portfolio",
    template: "%s | My Portfolio"
  },
  description:
    "Johnraymond Gallego's 4th year internship portfolio at Makerspace InnovHub, featuring frontend and backend projects built with Node.js, EJS, Tailwind CSS, and Vercel.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "My Portfolio",
    description:
      "4th year internship project work at Makerspace InnovHub, including Practice Web and H4M WORKFORCE ACCOUNTABILITY ATTENDANCE AND PAYROLL.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen overflow-x-hidden flex-col font-sans antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}