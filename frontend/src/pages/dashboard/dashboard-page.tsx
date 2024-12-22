import useAuth from "@/hooks/use-auth.ts";
import DashboardPageCompany from "@/pages/dashboard/(company)/dashboard-page-company.tsx";
import DashboardPageVendor from "@/pages/dashboard/(vendor)/dashboard-page-vendor.tsx";

export default function DashboardPage() {
  const { user } = useAuth();

  console.log(user);
  if (user?.role === "vendor") {
    return <DashboardPageVendor />;
  }

  return <DashboardPageCompany />;
}
