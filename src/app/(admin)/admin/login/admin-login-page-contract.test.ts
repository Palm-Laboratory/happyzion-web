import AdminLoginPage from "@/app/(admin)/admin/login/page";

void AdminLoginPage;

type AdminLoginPageProps = Parameters<typeof AdminLoginPage>[0];

const _assertPageProps: AdminLoginPageProps = {
  searchParams: Promise.resolve({
    callbackUrl: "/admin",
    error: "CredentialsSignin",
  }),
};

void _assertPageProps;
