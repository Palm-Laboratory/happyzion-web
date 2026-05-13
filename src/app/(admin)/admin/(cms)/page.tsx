import { redirect, RedirectType } from "next/navigation";

export default function AdminDashboardPage() {
  redirect("/admin/menu", RedirectType.replace);
}
