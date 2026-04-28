import PageHeader from "@/components/page-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "교회 소식",
  path: "/news",
});

export default function NewsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="News"
        title="공지, 주보, 행사 소식을 붙일 수 있는 페이지"
        description="초기 단계에서는 정적 콘텐츠로 시작하고, 이후 CMS나 API를 연결하는 방향으로 확장하기 좋게 비워 두었습니다."
      />
    </div>
  );
}
