import PageHeader from "@/components/page-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "새가족 안내",
  path: "/next-steps",
});

export default function NextStepsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Next Steps"
        title="처음 방문한 분들을 위한 진입점"
        description="새가족 등록, 양육 과정, 문의 채널처럼 방문자 전환 동선을 배치하기 좋은 자리입니다."
      />
    </div>
  );
}
