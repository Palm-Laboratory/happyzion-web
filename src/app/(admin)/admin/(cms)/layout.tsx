import { redirect } from "next/navigation";
import { getAdminSession, isAdminSession } from "@/auth";
import { AdminApiError } from "@/lib/admin-api";
import { getCurrentAdminAccount } from "@/lib/admin-accounts-api";
import CmsSidebar from "./components/cms-sidebar";
import CmsTopbar from "./components/cms-topbar";

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!isAdminSession(session)) {
    redirect("/admin/login?callbackUrl=/admin");
  }

  let topbarSession = session;
  const sessionSaysSuperAdmin = session.user.accountRole === "SUPER_ADMIN";

  try {
    const currentAccount = await getCurrentAdminAccount();
    const effectiveAccountRole =
      sessionSaysSuperAdmin || currentAccount.role === "SUPER_ADMIN"
        ? "SUPER_ADMIN"
        : currentAccount.role;

    topbarSession = {
      ...session,
      user: {
        ...session.user,
        name: currentAccount.displayName,
        username: currentAccount.username,
        accountRole: effectiveAccountRole,
      },
    };
  } catch (error) {
    if (error instanceof AdminApiError && (error.status === 401 || error.status === 403)) {
      redirect("/admin/login?callbackUrl=/admin");
    }
  }

  return (
    <>
      {/* 데스크톱 미만(1024px 이하) 차단 */}
      <div className="flex lg:hidden h-screen w-screen flex-col items-center justify-center gap-6 bg-[#080f1a] px-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3f74c7]/20">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="#6ca6f0" strokeWidth="1.5" />
            <path d="M8 21h8M12 17v4" stroke="#6ca6f0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-[17px] font-semibold text-white">데스크톱 환경에서 접속해 주세요</p>
          <p className="text-[13px] leading-relaxed text-white/45">
            관리자 페이지는 데스크톱 브라우저에서만 사용할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 데스크톱 레이아웃 */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        <CmsSidebar canManageAccounts={topbarSession.user.accountRole === "SUPER_ADMIN"} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <CmsTopbar session={topbarSession} />
          <main className="flex-1 overflow-y-auto bg-[#faf8ff]">
            <div className="mx-auto max-w-[1480px] px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
