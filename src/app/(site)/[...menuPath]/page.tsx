import {
  generateMenuDispatcherMetadata,
  renderMenuDispatcherPage,
  type MenuDispatcherPageProps,
} from "@/features/public-menu/menu-dispatcher";
import { fetchPublicMenuPaths } from "@/lib/public-menu-api";

export const generateMetadata = generateMenuDispatcherMetadata;

function isStrictBuild(): boolean {
  return process.env.CI === "true" || process.env.VERCEL_ENV === "production";
}

export async function generateStaticParams() {
  try {
    const paths = await fetchPublicMenuPaths();
    return paths.map((path) => ({
      menuPath: path.split("/").filter(Boolean),
    }));
  } catch (error) {
    if (isStrictBuild()) {
      throw new Error(
        `[HZ-009] 빌드 실패: 메뉴 경로를 가져올 수 없습니다. ` +
          `백엔드 API(API_BASE_URL)가 빌드 환경에서 접근 가능한지 확인하세요. ` +
          `(${error instanceof Error ? error.message : String(error)})`,
      );
    }
    console.warn(
      "[generateStaticParams] 백엔드에 연결할 수 없어 정적 생성을 건너뜁니다. " +
        "catch-all 동적 라우팅으로 fallback합니다.",
    );
    return [];
  }
}

export default function MenuDispatcherPage(props: MenuDispatcherPageProps) {
  return renderMenuDispatcherPage(props);
}
