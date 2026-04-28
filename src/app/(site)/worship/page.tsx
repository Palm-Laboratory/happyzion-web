import PageHeader from "@/components/page-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "예배 안내",
  path: "/worship",
});

export default function WorshipPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Worship"
        title="예배 시간과 현장 안내를 담는 페이지"
        description="정기 예배 시간표, 위치, 온라인 예배 링크, 주중 모임 정보를 여기에 붙이면 됩니다."
      />
    </div>
  );
}
