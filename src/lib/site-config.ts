const readEnv = (name: string, fallback: string) => {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : fallback;
};

export const SITE_URL = readEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
export const SITE_NAME = readEnv("NEXT_PUBLIC_SITE_NAME", "Happy Zion");
export const SITE_ALTERNATE_NAME = readEnv("NEXT_PUBLIC_SITE_ALTERNATE_NAME", "해피시온");
export const SITE_TAGLINE = readEnv("NEXT_PUBLIC_SITE_TAGLINE", "은혜와 평안이 머무는 공동체");
export const CHURCH_ADDRESS = readEnv("NEXT_PUBLIC_CHURCH_ADDRESS", "서울시 어딘가 123");
export const CHURCH_PHONE = readEnv("NEXT_PUBLIC_CHURCH_PHONE", "010-0000-0000");
export const CHURCH_EMAIL = readEnv("NEXT_PUBLIC_CHURCH_EMAIL", "hello@example.com");
export const YOUTUBE_CHANNEL_URL = readEnv("NEXT_PUBLIC_YOUTUBE_URL", "https://www.youtube.com/");

export const SITE_DESCRIPTION = `${SITE_ALTERNATE_NAME}(${SITE_NAME})는 ${SITE_TAGLINE}를 비전으로 세워가는 공동체입니다.`;
