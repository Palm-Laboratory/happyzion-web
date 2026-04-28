import { CHURCH_ADDRESS, CHURCH_EMAIL, CHURCH_PHONE, SITE_NAME } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-forest/10 bg-[#20352c] text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-8 md:py-14">
        <div className="space-y-3">
          <p className="font-serif text-2xl">{SITE_NAME}</p>
          <div className="space-y-1 text-sm text-ivory/72">
            <p>{CHURCH_ADDRESS}</p>
            <p>TEL {CHURCH_PHONE}</p>
            <p>EMAIL {CHURCH_EMAIL}</p>
          </div>
        </div>
        <p className="text-xs text-ivory/45">
          Copyright (c) 2026 {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
