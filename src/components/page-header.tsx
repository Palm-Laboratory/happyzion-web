/*
사이트 내부 페이지 상단에 나오는 메인 배너

- /about 과 같은 하위 페이지 상단에 title 과 subtitle 표시
- 현재 경로를 usePathName() 으로 읽음
- useNavigation()의 메뉴 데이터에서 현재 경로와 맞는 메뉴 그룹을 찾음
- 매칭되는 메뉴 그룹이 있으면 props로 받은 title 대신 메뉴 그룹의 label을 표시
*/
"use client";

import { usePathname } from "next/navigation";
import { useNavigation } from "@/lib/navigation-context";
import { findMatchedNavigationGroup } from "@/lib/navigation-utils";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
};

export default function PageHeader({
  title,
  subtitle,
  backgroundImageUrl: _backgroundImageUrl,
}: PageHeaderProps) {
  const pathname = usePathname() ?? "";
  const { navMenuGroups } = useNavigation();
  const menuGroup = findMatchedNavigationGroup(pathname, navMenuGroups);
  const displayTitle = menuGroup?.label || title;

  return (
    <section className="relative hidden h-[280px] w-full overflow-hidden bg-[#f6f5f0] md:block md:h-[300px]">
      <div className="absolute inset-0 bg-[#efe8d7]" />
      <div className="relative z-10 flex h-full items-center justify-center pt-10">
        <div className="text-center">
          <p className="type-label mb-3 font-semibold uppercase tracking-[0.2em] text-ink/50">
            {subtitle}
          </p>
          <h1 className="type-page-title font-section-title font-bold text-ink">{displayTitle}</h1>
        </div>
      </div>
    </section>
  );
}
