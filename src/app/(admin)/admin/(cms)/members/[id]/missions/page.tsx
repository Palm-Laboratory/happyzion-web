import { notFound } from "next/navigation";
import { AdminApiError } from "@/lib/admin-api";
import { getMemberMissions } from "@/lib/admin-missions-api";
import { getMissionTrips } from "@/lib/admin-missions-api";
import MemberMissionsClient from "./_components/member-missions-client";

export default async function MemberMissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  let participations;
  let allTrips;
  try {
    [participations, allTrips] = await Promise.all([
      getMemberMissions(id),
      getMissionTrips(),
    ]);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <MemberMissionsClient
      memberId={id}
      initialParticipations={participations.participations}
      allTrips={allTrips.trips}
    />
  );
}
