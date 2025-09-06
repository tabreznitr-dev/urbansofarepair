import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cedarville_Cursive } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Shagun Sofa Repair",
  description: "Premium Sofa Makers & Repair in Gurgaon",
  keywords: ["sofa repair", "sofa makers", "sofa repair in gurgaon", "sofa makers in gurgaon"],
  openGraph: {
    title: "Shagun Sofa Repair",
    description: "Premium Sofa Makers & Repair in Gurgaon",
    type: "website",
    locale: "en_IN",
    siteName: "Shagun Sofa Repair",
  },
};

const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cedarville",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={`${cedarville.variable}`}>
        {children}
      </body>
    </html>
  );
}
