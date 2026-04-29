import Link from "next/link";

import { primaryNavigation } from "@/lib/site-data";
import { CHURCH_ADDRESS, CHURCH_EMAIL, CHURCH_PHONE, SITE_NAME, YOUTUBE_CHANNEL_URL } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#1f0f28] text-white">
      <div className="mx-auto w-full px-5 py-10 md:px-10 lg:px-[80px] lg:py-[60px]">
        <div className="border-b border-white/20 pb-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-6">
              <p className="font-suit text-[28px] font-medium">{SITE_NAME}</p>
              <div className="space-y-2 text-white/50">
                <p className="font-suit text-base">{CHURCH_ADDRESS}</p>
                <p className="font-suit text-sm font-medium">
                  <span className="mr-8 text-white/30">TEL</span>
                  {CHURCH_PHONE}
                </p>
                <p className="font-suit text-sm font-medium">
                  <span className="mr-[18px] text-white/30">EMAIL</span>
                  {CHURCH_EMAIL}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
              {primaryNavigation.map((item) => (
                <div key={item.label} className="space-y-3">
                  <p className="font-suit text-base font-extrabold text-white">{item.label}</p>
                  <Link href={item.href} className="block font-suit text-sm text-white/50 hover:text-white">
                    {item.description}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-suit text-sm font-medium text-white/30">
            Copyright (c) 2026 {SITE_NAME} All rights reserved provided by Palm Lab
          </p>

          <div className="flex items-center gap-4">
            {[
              { label: "IG", href: "https://instagram.com" },
              { label: "FB", href: "https://facebook.com" },
              { label: "@", href: "https://threads.net" },
              { label: "YT", href: YOUTUBE_CHANNEL_URL },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1838] font-suit text-xs font-semibold text-white/80 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
