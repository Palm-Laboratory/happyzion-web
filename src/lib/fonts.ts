import localFont from "next/font/local";

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
