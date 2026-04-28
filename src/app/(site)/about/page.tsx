import PageHeader from "@/components/page-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "교회 소개",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="비전, 인사말, 교회 소개를 쌓아갈 자리"
        description="`tdch`처럼 상위 소개 섹션을 별도 경로로 분리해 두었습니다. 하위 상세 페이지가 필요하면 이 아래로 계속 확장하면 됩니다."
      />
    </div>
  );
}
