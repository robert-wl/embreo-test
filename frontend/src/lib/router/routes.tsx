import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";
import DashboardPage from "@/pages/(vendor)/dashboard/dashboard-page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashboardPage />,
  },
];
