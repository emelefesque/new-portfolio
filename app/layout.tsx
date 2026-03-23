import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Megan Feltes — Content Designer",
  description:
    "Principal Content Designer specializing in AI, data governance, voice & tone, and design systems. Previously at Meta and Square (Block).",
  openGraph: {
    title: "Megan Feltes — Content Designer",
    description:
      "Principal Content Designer specializing in AI, data governance, voice & tone, and design systems.",
    url: "https://emelef.com",
    siteName: "Megan Feltes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0D0D0D] text-[#F2E3D5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
