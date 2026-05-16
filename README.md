# Happy Zion Web

Happy Zion 공개 사이트와 관리자 CMS를 제공하는 Next.js 프로젝트입니다.

## 시작

```bash
npm install
cp .env.example .env.local
npm run dev
```

개발 서버: `http://localhost:3000`

## Vercel 환경 변수

Vercel Preview와 Production은 로컬 `.env.local`을 사용하지 않습니다. Vercel 대시보드의 Project Settings > Environment Variables에 아래 값을 Preview/Production 각각 설정해야 합니다.

```text
API_BASE_URL=https://<happyzion-api-domain>
NEXT_PUBLIC_API_BASE_URL=https://<happyzion-api-domain>
NEXTAUTH_URL=https://<vercel-preview-or-production-domain>
AUTH_SECRET=<strong-random-secret>
ADMIN_SESSION_MAX_AGE_SECONDS=28800
```

Production 기준 예시:

```text
API_BASE_URL=https://api.happyzion.com
NEXT_PUBLIC_API_BASE_URL=https://api.happyzion.com
NEXTAUTH_URL=https://www.happyzion.com
NEXT_PUBLIC_SITE_URL=https://www.happyzion.com
AUTH_SECRET=<strong-random-secret>
ADMIN_SESSION_MAX_AGE_SECONDS=28800
```

아직 운영 API가 없다면 Preview에서는 `API_BASE_URL` 없이도 빌드가 통과합니다. 이 경우 공개 홈은 확인할 수 있지만, 관리자 CMS와 API 연동 기능은 실제 접근 가능한 `happyzion_api` URL을 설정하기 전까지 동작하지 않습니다.

Production 배포에서는 `API_BASE_URL`과 `NEXT_PUBLIC_API_BASE_URL`이 필수입니다.

## 빌드타임 요구사항

`next build` 실행 시 백엔드 API(`API_BASE_URL`)가 실제로 접근 가능해야 합니다.

빌드 중에 `generateStaticParams()`가 `/api/v1/public/menu`를 호출해 공개 메뉴 경로 목록을 가져와 정적 페이지로 prerender합니다.

백엔드 미가용 시 동작은 빌드 환경에 따라 다릅니다.

- **CI (`CI=true`) 또는 Vercel production (`VERCEL_ENV=production`) 빌드:** 백엔드가 응답하지 않으면 빌드가 즉시 실패합니다.
- **로컬 `next build` (위 env 없음):** 경고만 출력하고 정적 생성을 건너뛴 뒤 동적 라우팅으로 fallback합니다.

`next build`는 로컬에서도 `NODE_ENV=production`으로 실행되므로, fast-fail 여부 판단에 `NODE_ENV`는 사용하지 않습니다.

CI 파이프라인에서는 `next build` 전에 백엔드 접근성을 먼저 확인하세요:

```bash
curl -f "${API_BASE_URL}/actuator/health" || (echo "백엔드 API에 연결할 수 없습니다." && exit 1)
next build
```

## 현재 구조

- `src/app`: App Router 엔트리
- `src/app/(site)`: 공개 사이트 라우트 그룹
- `src/components`: 공통 UI 조각
- `src/lib`: 사이트 설정, 데이터, SEO 유틸
- `src/types`: 타입 선언
- `public`: 정적 자산

## 공개 사이트 본문 레이아웃

공개 사이트의 정적 페이지와 게시판 본문은 공통 컨테이너인 `section-shell`을 기준으로 폭과 좌우 여백을 맞춥니다. 페이지마다 `max-w-*`, `mx-auto`, `px-*` 조합을 직접 반복하지 말고, 본문 최상위 `main` 또는 섹션 내부 컨텐츠 래퍼에 아래 클래스를 사용합니다.

```tsx
<main className="section-shell section-shell--narrow py-12 md:py-16">
  ...
</main>
```

배경이 화면 전체 폭으로 깔려야 하는 섹션은 바깥 `section`이 배경을 담당하고, 실제 컨텐츠만 `section-shell` 안에 둡니다.

```tsx
<section className="bg-[#faf7fb] py-16">
  <div className="section-shell">
    ...
  </div>
</section>
```

사용 기준:

- `section-shell--narrow`: 인사말, 예배 안내, 오시는 길, 역사, 온라인 헌금 안내처럼 읽기 중심의 정적 페이지와 상세 본문
- `section-shell`: 일반 소개 섹션, 카드 그리드, 기본 본문 영역
- `section-shell--wide`: 갤러리, 영상 목록, 넓은 카드/테이블형 화면
- `section-shell--full`: 정말 화면 전체 폭을 써야 하는 특수 영역

`section-shell`은 페이지/섹션 단위의 바깥 본문 컨테이너입니다. 카드 내부, 버튼 그룹, 작은 UI 컴포넌트 안쪽에는 사용하지 않습니다. 새 교회 소개 정적 페이지를 추가할 때는 `src/features/static-pages/about/pages`의 페이지 컴포넌트 최상위 본문을 기본적으로 `section-shell section-shell--narrow`로 시작합니다.
