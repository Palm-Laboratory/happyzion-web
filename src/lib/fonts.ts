import localFont from "next/font/local";
import { Corinthia, Cormorant_Garamond, Hahmlet } from "next/font/google";

export const hahmlet = Hahmlet({
  subsets: ["latin"],
  variable: "--font-hahmlet",
  weight: ["200", "400", "600", "700"],
  display: "swap",
});

export const corinthia = Corinthia({
  subsets: ["latin"],
  variable: "--font-corinthia",
  weight: ["400", "700"],
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  display: "swap",
});

export const notoSansKr = localFont({
  src: "../app/fonts/noto/NotoSansKR-VariableFont_wght.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

export const notoSerifKr = localFont({
  src: "../app/fonts/noto/NotoSerifKR-VariableFont_wght.ttf",
  variable: "--font-serif",
  display: "swap",
  weight: "100 900",
});

export const nanumMyeongjo = localFont({
  src: "../app/fonts/nanum/NanumMyeongjo-Regular.ttf",
  variable: "--font-section-title",
  display: "swap",
});

export const yeongwol = localFont({
  src: "../app/fonts/yeongwol/YeongwolTTF.ttf",
  variable: "--font-yeongwol",
  display: "swap",
});
