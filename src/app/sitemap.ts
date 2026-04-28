import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-config";

const routes = ["/", "/about", "/worship", "/next-steps", "/news"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
