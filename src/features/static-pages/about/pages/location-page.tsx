import {
  CHURCH_ADDRESS,
  CHURCH_EMAIL,
  CHURCH_LATITUDE_NUMBER,
  CHURCH_LONGITUDE_NUMBER,
  CHURCH_PHONE,
  KAKAO_MAP_URL,
  NAVER_MAP_PUBLIC_CLIENT_ID,
  NAVER_MAP_URL,
  SITE_NAME,
} from "@/lib/site-config";
import BulletItem from "@/components/bullet-item";
import SectionHeading from "@/components/section-heading";
import NaverDynamicMap from "@/features/static-pages/components/naver-dynamic-map";

const churchPhoneHref = CHURCH_PHONE.replace(/[^\d+]/g, "");

const busRoutes = [
  {
    type: "일반버스",
    routes: "11, 82, 85, 567, 703, 771, 999, 7728",
    stop: "주교동/원당시장 권역 정류장 이용",
  },
  { type: "광역버스", routes: "1082", stop: "주교동 인근 정류장 이용" },
  { type: "마을버스", routes: "019, 097, 099", stop: "주교동 인근 정류장 이용" },
];

function ExternalArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h8v8" />
    </svg>
  );
}

function MiniActionButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="type-body-small inline-flex items-center gap-2 rounded-full border border-cedar/15 bg-white px-4 py-2 font-semibold text-site-ink shadow-[0_10px_24px_rgba(16,33,63,0.08)] transition hover:-translate-y-0.5 hover:border-cedar/30 hover:text-cedar"
    >
      <span>{label}</span>
      <ExternalArrowIcon />
    </a>
  );
}

function LocationPageHeader() {
  return (
    <header>
      <SectionHeading
        label="location"
        title="오시는 길"
        description="Find Your Way to Happy Zion"
        titleAs="h1"
      />
    </header>
  );
}

function InfoSection({
  title,
  subtitle,
  description,
  children,
}: {
  title: string;
  subtitle: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <SectionHeading label={subtitle} title={title} description={description} />
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function LocationStaticPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <section id="map" className="relative overflow-hidden scroll-mt-28">
        <div className="section-shell section-shell--narrow relative py-12 md:py-16">
          <LocationPageHeader />

          <div className="mt-10 overflow-hidden border border-cedar/12 bg-white">
            <div className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[16/8] lg:aspect-[16/7]">
              <NaverDynamicMap
                clientId={NAVER_MAP_PUBLIC_CLIENT_ID}
                latitude={CHURCH_LATITUDE_NUMBER}
                longitude={CHURCH_LONGITUDE_NUMBER}
                title={SITE_NAME}
              />

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div className="rounded-[14px] border border-white/70 bg-white/88 px-3 py-2 text-site-ink shadow-[0_12px_28px_rgba(16,33,63,0.14)] backdrop-blur-md md:hidden">
                  <p className="text-center text-[0.8125rem] font-medium leading-6 text-site-ink/72">
                    {CHURCH_ADDRESS}
                  </p>
                </div>
                <div className="hidden max-w-[20rem] rounded-[16px] border border-white/70 bg-white/88 px-4 py-3 text-site-ink shadow-[0_12px_28px_rgba(16,33,63,0.14)] backdrop-blur-md md:block">
                  <h2 className="text-[1rem] font-bold leading-6 text-site-ink">
                    {SITE_NAME}
                  </h2>
                  <p className="mt-1 text-[0.875rem] font-medium leading-6 text-site-ink/72">
                    {CHURCH_ADDRESS}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cedar/10 bg-[#f8fbff] px-4 py-4 md:px-6">
              <p className="type-body-small text-site-ink/55">
                지도를 크게 확인하거나 길찾기를 시작하려면 아래 버튼을 사용해 주세요.
              </p>
              <div className="flex flex-wrap gap-2">
                <MiniActionButton label="네이버 지도" href={NAVER_MAP_URL} />
                <MiniActionButton label="카카오맵" href={KAKAO_MAP_URL} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--narrow py-12 md:py-16">
        <div className="space-y-16 md:space-y-24">
          <InfoSection
            title="방문 안내"
            subtitle="visit guide"
          >
            <ul className="type-body space-y-3 text-black/88">
              <BulletItem>
                지도 앱에서 <strong className="font-semibold text-[#8b6db5]">{SITE_NAME}</strong>
                또는 <strong className="font-semibold text-[#8b6db5]">{CHURCH_ADDRESS}</strong>를 검색해 주세요.
              </BulletItem>
              <BulletItem>
                주일 예배나 모임에 처음 방문하시는 경우, 도착 전 교회로 연락하시면 안내를 받으실 수 있습니다.
              </BulletItem>
              <BulletItem>
                주차 가능 여부와 주변 교통 상황은 시간대에 따라 달라질 수 있어 방문 전 지도 앱의 길찾기를 함께 확인해 주세요.
              </BulletItem>
            </ul>
          </InfoSection>

          <InfoSection
            title="지하철 이용"
            subtitle="subway"
            description="Public Transit Transfer Guide"
          >
            <ul className="type-body space-y-3 text-black/88">
              <BulletItem>
                지하철 이용 시 원당역 권역에서 버스 또는 택시로 환승해 오시는 경로를 권장합니다.
              </BulletItem>
              <BulletItem>
                출발 위치에 따라 최적 경로가 달라질 수 있으니 네이버 지도, 카카오맵, 구글 지도 길찾기를 확인해 주세요.
              </BulletItem>
            </ul>
          </InfoSection>

          <InfoSection
            title="버스 이용"
            subtitle="bus"
          >
            <div className="overflow-x-auto border-x border-b border-t-[3px] border-cedar/15 border-t-site-ink bg-white">
              <table className="w-full min-w-[680px] table-fixed border-collapse text-left lg:min-w-[760px]">
                <thead>
                  <tr className="border-b border-cedar/15 bg-[#fafcff]">
                    <th className="type-label w-[24%] border-r border-cedar/15 px-4 py-4 text-center font-semibold tracking-[0.08em] text-site-ink/72 lg:px-6 lg:py-5">
                      구분
                    </th>
                    <th className="type-label w-[36%] border-r border-cedar/15 px-4 py-4 text-center font-semibold tracking-[0.08em] text-site-ink/72 lg:px-6 lg:py-5">
                      노선
                    </th>
                    <th className="type-label px-4 py-4 text-center font-semibold tracking-[0.08em] text-site-ink/72 lg:px-6 lg:py-5">
                      안내
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {busRoutes.map((item) => (
                    <tr key={item.type} className="border-b border-cedar/15 last:border-b-0">
                      <td className="type-body border-r border-cedar/15 px-4 py-5 text-center font-medium text-site-ink/80 lg:px-6 lg:py-6">
                        {item.type}
                      </td>
                      <td className="type-body border-r border-cedar/15 px-4 py-5 text-center font-bold text-site-ink lg:px-6 lg:py-6">
                        {item.routes}
                      </td>
                      <td className="type-body px-4 py-5 text-center font-medium text-site-ink/80 lg:px-6 lg:py-6">
                        {item.stop}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="type-body-small mt-4 text-site-ink/55">
              버스 노선은 운행 상황에 따라 변경될 수 있으므로 출발 전 실시간 길찾기를 확인해 주세요.
            </p>
          </InfoSection>

          <div id="contact-info" className="scroll-mt-28">
            <InfoSection
              title="교회정보"
              subtitle="church info"
            >
              <ul className="type-body space-y-3 text-black/88">
                <BulletItem>주소 : {CHURCH_ADDRESS}</BulletItem>
                <BulletItem>
                  TEL :{" "}
                  <a href={`tel:${churchPhoneHref}`} className="transition hover:text-cedar">
                    {CHURCH_PHONE}
                  </a>
                </BulletItem>
                <BulletItem>
                  EMAIL :{" "}
                  <a href={`mailto:${CHURCH_EMAIL}`} className="transition hover:text-cedar">
                    {CHURCH_EMAIL}
                  </a>
                </BulletItem>
              </ul>
            </InfoSection>
          </div>
        </div>
      </section>
    </main>
  );
}
