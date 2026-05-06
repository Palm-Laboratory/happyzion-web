const readEnv = (name: string, fallback: string) => {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : fallback;
};

export const SITE_URL = readEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
export const SITE_NAME = readEnv("NEXT_PUBLIC_SITE_NAME", "행복이가득한 시온장로교회");
export const SITE_ALTERNATE_NAME = readEnv("NEXT_PUBLIC_SITE_ALTERNATE_NAME", "HAPPY.Zion");
export const SITE_TAGLINE = readEnv("NEXT_PUBLIC_SITE_TAGLINE", "우리는 복음으로 사람을 살리는 교회입니다");
export const CHURCH_ADDRESS = readEnv(
  "NEXT_PUBLIC_CHURCH_ADDRESS",
  "경기 고양시 덕양구 호국로811번길 36",
);
export const CHURCH_PHONE = readEnv("NEXT_PUBLIC_CHURCH_PHONE", "031-967-1004");
export const CHURCH_EMAIL = readEnv("NEXT_PUBLIC_CHURCH_EMAIL", "happyzion@gmail.com");
export const YOUTUBE_CHANNEL_URL = readEnv("NEXT_PUBLIC_YOUTUBE_URL", "https://www.youtube.com/@zion3809");

export const SITE_DESCRIPTION = `${SITE_ALTERNATE_NAME}(${SITE_NAME})는 ${SITE_TAGLINE}를 비전으로 세워가는 공동체입니다.`;
