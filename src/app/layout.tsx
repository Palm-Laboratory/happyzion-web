import type { Viewport } from "next";

import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import {
  corinthia,
  cormorant,
  cormorantGaramond,
  cormorantInfant,
  estonia,
  hahmlet,
} from "@/lib/fonts";

export const viewport: Viewport = {
  themeColor: "#f6f5f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${corinthia.variable} ${cormorant.variable} ${cormorantGaramond.variable} ${cormorantInfant.variable} ${estonia.variable} ${hahmlet.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
