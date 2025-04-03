import type { Metadata } from "next";
import {DM_Sans} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
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
       className={`${dmSans.variable} antialiased tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
