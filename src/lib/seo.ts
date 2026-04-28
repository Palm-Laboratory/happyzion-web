import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const DEFAULT_OG_IMAGE = {
  url: "/images/logo/site-mark.svg",
  width: 160,
  height: 160,
  alt: SITE_NAME,
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
