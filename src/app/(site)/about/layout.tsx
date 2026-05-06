import SitePageShell from "@/components/site-page-shell";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SitePageShell title="교회 소개" subtitle="ABOUT HAPPY ZION">
      {children}
    </SitePageShell>
  );
}
