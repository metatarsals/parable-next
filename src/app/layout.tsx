import type { Metadata } from "next";
import {DM_Sans, Playfair_Display} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

const playFair = Playfair_Display({
  variable: "--font-playfair",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Parable.",
  description: "Translated by us with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
       className={`${dmSans.variable} ${playFair.variable} antialiased tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
