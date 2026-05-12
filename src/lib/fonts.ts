import { Corinthia, Cormorant, Cormorant_Garamond, Cormorant_Infant, Estonia, Hahmlet } from "next/font/google";

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

export const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const estonia = Estonia({
  subsets: ["latin"],
  variable: "--font-estonia",
  weight: ["400"],
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const cormorantInfant = Cormorant_Infant({
  subsets: ["latin"],
  variable: "--font-cormorant-infant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
