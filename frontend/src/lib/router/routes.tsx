import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";
import AppLayout from "@/components/layout/app-layout.tsx";
import DashboardPage from "@/pages/dashboard/(company)/dashboard-page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
];
