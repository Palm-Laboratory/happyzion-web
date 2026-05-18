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

function MobileServiceCard({ title, schedule, location, audience }: ServiceTime) {
  return (
    <article className="rounded-[8px] border border-[#8b6db5]/18 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(16,33,63,0.06)]">
      <h3 className="type-title-md font-bold text-black">{title}</h3>
      <dl className="type-body-xs mt-4 space-y-3">
        <div className="flex items-start justify-between gap-4 border-b border-[#8b6db5]/12 pb-3">
          <dt className="shrink-0 font-semibold text-black/70">시간</dt>
          <dd className="text-right font-medium text-black/88">{schedule}</dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="shrink-0 font-semibold text-black/70">장소</dt>
          <dd className="text-right font-medium text-black/88">{location}</dd>
        </div>
        <div className="flex items-start justify-between gap-4 border-t border-[#8b6db5]/12 pt-3">
          <dt className="shrink-0 font-semibold text-black/70">대상</dt>
          <dd className="text-right font-medium text-black/88">{audience}</dd>
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
          <tr className="border-b border-[#8b6db5]/12 bg-[#FAF7FF]">
            <th className="type-label-md font-suit w-[24%] border-r border-[#8b6db5]/12 px-4 py-4 text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-6 lg:py-5">
              구분
            </th>
            <th className="type-label-md font-suit w-[30%] border-r border-[#8b6db5]/12 px-4 py-4 text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-6 lg:py-5">
              요일 / 시간
            </th>
            <th className="type-label-md font-suit w-[23%] border-r border-[#8b6db5]/12 px-4 py-4 text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-6 lg:py-5">
              장소
            </th>
            <th className="type-label-md font-suit px-4 py-4 text-center font-semibold tracking-[0.08em] text-[#33103f] lg:px-6 lg:py-5">
              대상
            </th>
          </tr>
        </thead>
        <tbody>
          {serviceTimes.map((service) => (
            <tr key={service.title} className="border-b border-[#8b6db5]/12 last:border-b-0">
              <td className="type-body-md border-r border-[#8b6db5]/12 px-4 py-5 text-center font-bold text-[#33103f] lg:px-6 lg:py-6">
                {service.title}
              </td>
              <td className="type-body-md border-r border-[#8b6db5]/12 px-4 py-5 text-center font-medium text-[#4A3B5E] lg:px-6 lg:py-6">
                {service.schedule}
              </td>
              <td className="type-body-md border-r border-[#8b6db5]/12 px-4 py-5 text-center font-medium text-[#4A3B5E] lg:px-6 lg:py-6">
                {service.location}
              </td>
              <td className="type-body-md px-4 py-5 text-center font-medium text-[#4A3B5E] lg:px-6 lg:py-6">
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
    <main className="section-shell section-shell--narrow bg-white pt-10 pb-20 md:pt-16">
      <section>
        <SectionHeading
          label="service times"
          title="예배 시간 안내"
          description="Worship Service Guide"
          titleAs="h1"
        />

        <div className="mt-10 md:mt-12">
          <div className="space-y-4 md:hidden">
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
