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
ADMIN_SYNC_KEY=<happyzion_api ADMIN_SYNC_KEY와 동일한 값>
ADMIN_SESSION_MAX_AGE_SECONDS=28800
```

아직 운영 API가 없다면 Preview에서는 `API_BASE_URL` 없이도 빌드가 통과합니다. 이 경우 공개 홈은 확인할 수 있지만, 관리자 CMS와 API 연동 기능은 실제 접근 가능한 `happyzion_api` URL을 설정하기 전까지 동작하지 않습니다.

Production 배포에서는 `API_BASE_URL`과 `NEXT_PUBLIC_API_BASE_URL`이 필수입니다.

## 현재 구조

- `src/app`: App Router 엔트리
- `src/app/(site)`: 공개 사이트 라우트 그룹
- `src/components`: 공통 UI 조각
- `src/lib`: 사이트 설정, 데이터, SEO 유틸
- `src/types`: 타입 선언
- `public`: 정적 자산

## 기본 라우트

- `/`
- `/about`
- `/worship`
- `/next-steps`
- `/news`
