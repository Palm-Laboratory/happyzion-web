import { notFound, redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import { getMissionTrip } from "@/lib/admin-missions-api";
import AdminBreadcrumb from "../../components/admin-breadcrumb";
import MissionTripForm from "../_components/mission-trip-form";
import ParticipantManager from "../_components/participant-manager";
import DeleteTripButton from "../_components/delete-trip-button";
import { updateMissionTripAction, deleteMissionTripAction } from "../actions";

export default async function MissionTripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const session = await getAdminSession();
  if (!isAdminSession(session)) redirect(`/admin/login?callbackUrl=/admin/missions/${id}`);

  let trip;
  try {
    trip = await getMissionTrip(id);
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 404) notFound();
    throw error;
  }

  const boundUpdate = updateMissionTripAction.bind(null, id);
  const boundDelete = deleteMissionTripAction.bind(null, id);

  return (
    <div className="space-y-5">
      <AdminBreadcrumb
        items={[
          { label: "교회 관리" },
          { label: "선교 관리", href: "/admin/missions" },
          { label: trip.title },
        ]}
      />
      <h1 className="text-xl font-bold text-[#0f1c2e]">{trip.title}</h1>

      <MissionTripForm mode="edit" initialData={trip} action={boundUpdate} />
      <ParticipantManager tripId={id} initialParticipants={trip.participants} />
      <div className="flex justify-end">
        <DeleteTripButton onDelete={boundDelete} />
      </div>
    </div>
  );
}
