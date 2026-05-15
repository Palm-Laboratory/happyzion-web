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
      <section className="bg-[#fefbff] pb-[200px]">
        <div className="section-shell section-shell--narrow">
          <ClosingCallout />
        </div>
      </section>
    </main>
  );
}
