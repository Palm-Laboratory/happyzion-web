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
    <section
      className="relative h-[260px] w-full overflow-hidden md:h-[360px] lg:h-[320px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 620px 300px at 78% 34%, rgba(49, 4, 90, 0.2), rgba(49, 4, 90, 0) 68%), radial-gradient(ellipse 430px 260px at 23% 82%, rgba(191, 114, 236, 0.1), rgba(191, 114, 236, 0) 70%), linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(118deg, #2e1f46 27%, #4b3473 87%)",
      }}
    >
      <div className="pointer-events-none absolute -left-[136px] -top-[176px] h-[392px] w-[392px] rounded-full border border-white/[0.055]" />
      <div className="pointer-events-none absolute -right-[160px] -top-[68px] h-[512px] w-[512px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute right-[8%] top-[38%] h-[392px] w-[392px] rounded-full border border-white/[0.045]" />
      <div className="pointer-events-none absolute left-[4%] top-[78%] h-[314px] w-[314px] rounded-full border border-white/[0.045]" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center uppercase">
          <p className="mb-4 font-serif text-xs font-light leading-none tracking-[0.16em] text-[#c9a96e] md:mb-5">
            {subtitle}
          </p>
          <h1 className="font-hahmlet text-[40px] font-semibold leading-none tracking-[0.01em] text-white md:text-[46px] lg:text-[52px]">
            {displayTitle}
          </h1>
        </div>
      </div>
    </section>
  );
}
