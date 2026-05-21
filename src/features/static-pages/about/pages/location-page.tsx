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

function MobileBusRouteCard({ type, routes, stop }: (typeof busRoutes)[number]) {
  return (
    <article className="flex flex-col gap-comp-base rounded-[8px] border border-[#8b6db5]/18 bg-white px-pad-sm py-pad-sm shadow-[0_8px_24px_rgba(16,33,63,0.06)]">
      <h3 className="type-title-md font-medium text-black">{type}</h3>
      <dl className="type-body-xs flex flex-col gap-comp-md">
        <div className="flex items-start justify-between gap-comp-base border-b border-[#8b6db5]/12 pb-comp-md">
          <dt className="shrink-0 font-semibold text-black/70">노선</dt>
          <dd className="text-right font-bold text-black/88">{routes}</dd>
        </div>
        <div className="flex items-start justify-between gap-comp-base">
          <dt className="shrink-0 font-semibold text-black/70">안내</dt>
          <dd className="text-right font-medium text-black/88">{stop}</dd>
        </div>
      </dl>
    </article>
  );
}

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
      className="type-body-xs inline-flex items-center gap-comp-sm rounded-[4px] border border-[#8b6db5]/18 bg-white px-pad-xs py-pad-3xs font-semibold text-[#33103f] shadow-[0_10px_24px_rgba(51,16,63,0.08)] transition hover:-translate-y-0.5 hover:border-[#8b6db5]/45 hover:text-[#8b6db5]"
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
    <section className="flex flex-col gap-layout-md">
      <SectionHeading label={subtitle} title={title} description={description} />
      {children}
    </section>
  );
}

export default function LocationStaticPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <section id="map" className="scroll-mt-28">
        <div className="section-shell section-shell--narrow flex flex-col gap-layout-xxl pt-section-sm pb-section-xl md:pt-section-md md:pb-section-xxl lg:pt-section-lg lg:pb-section-3xl">
          <div className="flex flex-col gap-layout-md">
            <LocationPageHeader />

            <div className="overflow-hidden border border-[#8b6db5]/18 bg-white">
            <div className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[16/8] lg:aspect-[16/7]">
              <NaverDynamicMap
                clientId={NAVER_MAP_PUBLIC_CLIENT_ID}
                latitude={CHURCH_LATITUDE_NUMBER}
                longitude={CHURCH_LONGITUDE_NUMBER}
                title={SITE_NAME}
              />

              <div className="absolute inset-x-0 bottom-0 p-pad-xxs md:p-pad-xs">
                <div className="flex flex-col gap-comp-xxs rounded-[4px] border border-white/70 bg-white/88 px-pad-xxs py-pad-3xs text-[#33103f] shadow-[0_12px_28px_rgba(51,16,63,0.14)] backdrop-blur-md md:hidden">
                  <h2 className="type-title-xs font-suit font-bold text-[#33103f]">
                    {SITE_NAME}
                  </h2>
                  <p className="type-body-xs font-medium text-[#33103f]/72">
                    {CHURCH_ADDRESS}
                  </p>
                </div>
                <div className="hidden max-w-[20rem] flex-col gap-comp-xxs rounded-[4px] border border-white/70 bg-white/88 px-pad-xs py-pad-xxs text-[#33103f] shadow-[0_12px_28px_rgba(51,16,63,0.14)] backdrop-blur-md md:flex">
                  <h2 className="type-title-xs font-suit font-bold text-[#33103f]">
                    {SITE_NAME}
                  </h2>
                  <p className="type-body-xs font-medium text-[#33103f]/72">
                    {CHURCH_ADDRESS}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-comp-md border-t border-[#8b6db5]/12 bg-[#fcf8ff] px-pad-xs py-pad-xs md:px-pad-md">
              <p className="type-body-xs text-[#928397]">
                지도를 크게 확인하거나 길찾기를 시작하려면 우측 버튼을 사용해주세요
              </p>
              <div className="flex flex-wrap gap-comp-sm">
                <MiniActionButton label="네이버 지도" href={NAVER_MAP_URL} />
                <MiniActionButton label="카카오맵" href={KAKAO_MAP_URL} />
              </div>
            </div>
            </div>
          </div>

          <InfoSection
            title="방문 안내"
            subtitle="visit guide"
          >
            <ul className="type-body-sm md:type-body-md flex flex-col gap-comp-sm md:gap-comp-md text-[#4A3B5E]">
              <BulletItem>
                지도 앱에서 <strong className="font-semibold text-[#bd6fe0]">{SITE_NAME}</strong>
                또는 <strong className="font-semibold text-[#bd6fe0]">{CHURCH_ADDRESS}</strong>를 검색해 주세요.
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
            <ul className="type-body-sm md:type-body-md flex flex-col gap-comp-sm md:gap-comp-md text-[#4A3B5E]">
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
            <div className="flex flex-col gap-comp-base">
              <div className="flex flex-col gap-comp-base md:hidden">
                {busRoutes.map((item) => (
                  <MobileBusRouteCard key={item.type} {...item} />
                ))}
              </div>

              <div className="hidden overflow-x-auto border-x border-b border-t-[3px] border-[#5d3d8a]/15 border-t-[#33103f] bg-white md:block">
                <table className="w-full min-w-[680px] table-fixed border-collapse text-left lg:min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#8b6db5]/12 bg-[#FAF7FF]">
                      <th className="type-title-xs font-suit font-bold w-[24%] border-r border-[#8b6db5]/12 px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
                        구분
                      </th>
                      <th className="type-title-xs font-suit font-bold w-[36%] border-r border-[#8b6db5]/12 px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
                        노선
                      </th>
                      <th className="type-title-xs font-suit font-bold px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
                        안내
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {busRoutes.map((item) => (
                      <tr key={item.type} className="border-b border-[#8b6db5]/12 last:border-b-0">
                        <td className="type-body-md border-r border-[#8b6db5]/12 px-pad-sm py-pad-sm text-center font-medium text-[#4A3B5E] lg:px-pad-md lg:py-pad-md">
                          {item.type}
                        </td>
                        <td className="type-body-md border-r border-[#8b6db5]/12 px-pad-sm py-pad-sm text-center font-bold text-[#33103f] lg:px-pad-md lg:py-pad-md">
                          {item.routes}
                        </td>
                        <td className="type-body-md px-pad-sm py-pad-sm text-center font-medium text-[#4A3B5E] lg:px-pad-md lg:py-pad-md">
                          {item.stop}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="type-body-xs text-[#928397]">
                버스 노선은 운행 상황에 따라 변경될 수 있으므로 출발 전 실시간 길찾기를 확인해 주세요.
              </p>
            </div>
          </InfoSection>

          <div id="contact-info" className="scroll-mt-28">
            <InfoSection
              title="교회정보"
              subtitle="church info"
            >
              <ul className="type-body-sm md:type-body-md flex flex-col gap-comp-sm md:gap-comp-md text-[#4A3B5E]">
                <BulletItem>주소 : {CHURCH_ADDRESS}</BulletItem>
                <BulletItem>
                  TEL :{" "}
                  <a href={`tel:${churchPhoneHref}`} className="transition hover:text-[#510a75]">
                    {CHURCH_PHONE}
                  </a>
                </BulletItem>
                <BulletItem>
                  EMAIL :{" "}
                  <a href={`mailto:${CHURCH_EMAIL}`} className="transition hover:text-[#510a75]">
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
