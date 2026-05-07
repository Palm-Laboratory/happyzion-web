import Image from "next/image";
import Link from "next/link";

import { CHURCH_ADDRESS, CHURCH_EMAIL, CHURCH_PHONE, SITE_NAME, YOUTUBE_CHANNEL_URL } from "@/lib/site-config";
import { primaryNavigation } from "@/lib/site-data";
import type { NavigationLink } from "@/types/navigation";

type SiteFooterProps = {
  navigationItems?: NavigationLink[];
};

const socialLinks = [
  { label: "YouTube", href: YOUTUBE_CHANNEL_URL, icon: "youtube" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/joy_filled_zion_church/",
    icon: "instagram",
  },
  { label: "Facebook", href: "#", icon: "facebook" },
] as const;

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M21.2 7.2a3 3 0 0 0-2.1-2.1C17.2 4.6 12 4.6 12 4.6s-5.2 0-7.1.5a3 3 0 0 0-2.1 2.1A31.4 31.4 0 0 0 2.3 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.1.5 7.1.5s5.2 0 7.1-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="m10 15 5.2-3L10 9v6Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M14 8.4V7.1c0-.8.5-1.1 1.2-1.1h1.6V3.2c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.1v1.3H7.5v3.2h2.7V21H14v-9.4h2.7l.5-3.2H14Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

export default function SiteFooter({ navigationItems = primaryNavigation }: SiteFooterProps) {
  return (
    <footer id="footer" className="relative z-10 bg-[#1f0f28] text-white">
      <div className="mx-auto w-full px-5 py-10 md:px-10 lg:px-[80px] lg:py-[60px]">
        <div className="border-b border-white/20 pb-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo/happyzion-logo.png"
                  alt="Happy Zion logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <p className="font-suit text-[28px] font-medium">{SITE_NAME}</p>
              </div>
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

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 justify-items-start gap-x-9 gap-y-8 self-end sm:grid-cols-3 lg:auto-cols-max lg:grid-flow-col lg:grid-cols-none lg:justify-end"
            >
              {navigationItems.map((item) => (
                <div key={`${item.label}:${item.href}`} className="min-w-0 space-y-5">
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noreferrer" : undefined}
                    className="block font-suit text-base font-extrabold leading-none text-white transition hover:text-white/80"
                  >
                    {item.label}
                  </Link>

                  {item.children && item.children.length > 0 && (
                    <div className="flex flex-col items-start gap-3.5">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.label}:${child.href}`}
                          href={child.href}
                          target={child.openInNewTab ? "_blank" : undefined}
                          rel={child.openInNewTab ? "noreferrer" : undefined}
                          className="font-suit text-sm font-medium leading-none text-white/50 transition hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-suit text-sm font-medium text-white/30">
            Copyright (c) 2026 {SITE_NAME} All rights reserved
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target={item.href === "#" ? undefined : "_blank"}
                rel={item.href === "#" ? undefined : "noreferrer"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c1838] text-white/80 transition hover:bg-[#3a2148] hover:text-white"
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
