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
export const CHURCH_EMAIL = readEnv("NEXT_PUBLIC_CHURCH_EMAIL", "woansub@naver.com");
export const YOUTUBE_CHANNEL_URL = readEnv("NEXT_PUBLIC_YOUTUBE_URL", "https://www.youtube.com/@zion3809");
export const NAVER_MAP_URL = readEnv(
  "NEXT_PUBLIC_NAVER_MAP_URL",
  "https://map.naver.com/p/entry/place/32138089?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202605111129&locale=ko&svcName=map_pcv5",
);
export const KAKAO_MAP_URL = readEnv("NEXT_PUBLIC_KAKAO_MAP_URL", "https://map.kakao.com/link/search/%EA%B2%BD%EA%B8%B0%20%EA%B3%A0%EC%96%91%EC%8B%9C%20%EB%8D%95%EC%96%91%EA%B5%AC%20%ED%98%B8%EA%B5%AD%EB%A1%9C811%EB%B2%88%EA%B8%B8%2036");
export const NAVER_MAP_PUBLIC_CLIENT_ID = readEnv(
  "NEXT_PUBLIC_NAVER_MAP_CLIENT_ID",
  "",
);
export const CHURCH_LATITUDE = readEnv("NEXT_PUBLIC_CHURCH_LAT", "37.6593388");
export const CHURCH_LONGITUDE = readEnv("NEXT_PUBLIC_CHURCH_LNG", "126.8364151");
export const CHURCH_LATITUDE_NUMBER = Number(CHURCH_LATITUDE);
export const CHURCH_LONGITUDE_NUMBER = Number(CHURCH_LONGITUDE);

export const SITE_DESCRIPTION = `${SITE_ALTERNATE_NAME}(${SITE_NAME})는 ${SITE_TAGLINE}를 비전으로 세워가는 공동체입니다.`;
