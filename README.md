# Happy Zion Web

Happy Zion 공개 사이트와 관리자 CMS를 제공하는 Next.js 프로젝트입니다.

## 시작

```bash
npm install
cp .env.example .env.local
npm run dev
```

개발 서버: `http://localhost:3000`

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
