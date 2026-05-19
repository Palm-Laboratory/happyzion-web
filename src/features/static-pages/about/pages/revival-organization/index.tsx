import VisionCoreValuesSection from "./vision-core-values-section";
import MinistryTeamsSection from "./ministry-teams-section";
import SmallGroupsMinistrySection from "./small-groups-section";
import ClosingCallout from "./closing-callout";

export default function RevivalOrganizationStaticPage() {
  return (
    <main className="min-h-[520px] w-full overflow-x-hidden bg-white">
      <VisionCoreValuesSection />
      <MinistryTeamsSection />
      <SmallGroupsMinistrySection />
      <section className="bg-[#fefbff] pt-section-sm pb-section-xl md:pt-section-md md:pb-section-xxl lg:pt-section-lg lg:pb-section-3xl">
        <div className="section-shell section-shell--narrow">
          <ClosingCallout />
        </div>
      </section>
    </main>
  );
}
