import SectionHeading from "@/components/section-heading";

type ServiceTime = {
  title: string;
  schedule: string;
  location: string;
  audience: string;
};

const serviceTimes: ServiceTime[] = [
  {
    title: "주일대예배",
    schedule: "주일 오전 11:00",
    location: "교회본당",
    audience: "전 성도",
  },
  {
    title: "주일저녁예배",
    schedule: "주일 오후 7:00",
    location: "교회본당",
    audience: "전 성도",
  },
  {
    title: "학생부예배",
    schedule: "주일 오후 2:00",
    location: "교회카페",
    audience: "청년, 중고등부",
  },
  {
    title: "주일학교예배",
    schedule: "주일 오전 9:00, 오후 3:00",
    location: "교회본당",
    audience: "유아부-초등부",
  },
  {
    title: "수요저녁예배",
    schedule: "수요일 오후 7:00",
    location: "교회본당",
    audience: "전 성도",
  },
  {
    title: "금요기도회",
    schedule: "금요일 오후 9:00",
    location: "교회본당",
    audience: "전 성도",
  },
  {
    title: "새벽기도회",
    schedule: "주일-금요일 오전 5:00",
    location: "교회본당",
    audience: "전 성도",
  },
];

function MobileServiceCard({
  title,
  schedule,
  location,
  audience,
}: ServiceTime) {
  return (
    <article className="border-[#8b6db5]/18 flex flex-col gap-comp-base rounded-[8px] border bg-white px-pad-sm py-pad-sm shadow-[0_8px_24px_rgba(16,33,63,0.06)]">
      <h3 className="type-title-md font-medium text-[#250030]">{title}</h3>
      <dl className="flex flex-col gap-comp-md">
        <div className="border-[#8b6db5]/12 flex items-start justify-between gap-comp-base border-b pb-comp-md">
          <dt className="type-body-xs shrink-0 font-semibold text-[#4A3B5E]">시간</dt>
          <dd className="type-body-xs text-right font-medium text-[#33103F]">{schedule}</dd>
        </div>
        <div className="flex items-start justify-between gap-comp-base">
          <dt className="type-body-xs shrink-0 font-semibold text-[#4A3B5E]">장소</dt>
          <dd className="type-body-xs text-right font-medium text-[#33103F]">{location}</dd>
        </div>
        <div className="border-[#8b6db5]/12 flex items-start justify-between gap-comp-base border-t pt-comp-md">
          <dt className="type-body-xs shrink-0 font-semibold text-[#4A3B5E]">대상</dt>
          <dd className="type-body-xs text-right font-medium text-[#33103F]">{audience}</dd>
        </div>
      </dl>
    </article>
  );
}

function ServiceTimesTable() {
  return (
    <div className="hidden overflow-x-auto border-x border-b border-t-[3px] border-[#5d3d8a]/15 border-t-[#33103f] bg-white md:block">
      <table className="w-full min-w-[860px] table-fixed border-collapse text-left">
        <thead>
          <tr className="border-[#8b6db5]/12 border-b bg-[#FAF7FF]">
            <th className="type-title-xs font-suit border-[#8b6db5]/12 w-[24%] border-r px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
              구분
            </th>
            <th className="type-title-xs font-suit border-[#8b6db5]/12 w-[30%] border-r px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
              요일 / 시간
            </th>
            <th className="type-title-xs font-suit border-[#8b6db5]/12 w-[23%] border-r px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
              장소
            </th>
            <th className="type-title-xs font-suit px-pad-xs py-pad-xs text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-pad-sm lg:py-pad-sm">
              대상
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceTimes.map((service) => (
            <tr
              key={service.title}
              className="border-[#8b6db5]/12 border-b last:border-b-0"
            >
              <td className="type-body-md border-[#8b6db5]/12 border-r px-pad-sm py-pad-sm text-center font-bold text-[#33103f] lg:px-pad-md lg:py-pad-md">
                {service.title}
              </td>
              <td className="type-body-md border-[#8b6db5]/12 border-r px-pad-sm py-pad-sm text-center font-medium text-[#4A3B5E] lg:px-pad-md lg:py-pad-md">
                {service.schedule}
              </td>
              <td className="type-body-md border-[#8b6db5]/12 border-r px-pad-sm py-pad-sm text-center font-medium text-[#4A3B5E] lg:px-pad-md lg:py-pad-md">
                {service.location}
              </td>
              <td className="type-body-md px-pad-sm py-pad-sm text-center font-medium text-[#4A3B5E] lg:px-pad-md lg:py-pad-md">
                {service.audience}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ServiceTimesStaticPage() {
  return (
    <main className="section-shell section-shell--narrow bg-white pt-section-sm pb-section-xl md:pt-section-md md:pb-section-xxl lg:pt-section-lg lg:pb-section-3xl">
      <section className="flex flex-col gap-layout-lg lg:gap-layout-xl">
        <SectionHeading
          label="service times"
          title="예배 시간 안내"
          description="Worship Service Guide"
          titleAs="h1"
        />

        <div>
          <div className="flex flex-col gap-layout-sm md:hidden">
            {serviceTimes.map((service) => (
              <MobileServiceCard key={service.title} {...service} />
            ))}
          </div>

          <ServiceTimesTable />
        </div>
      </section>
    </main>
  );
}
