import type { Viewport } from "next";

import "./globals.css";
import { nanumMyeongjo, notoSansKr, notoSerifKr, yeongwol } from "@/lib/fonts";

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
        className={`${notoSansKr.variable} ${notoSerifKr.variable} ${nanumMyeongjo.variable} ${yeongwol.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
