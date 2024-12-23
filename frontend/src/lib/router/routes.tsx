import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";
import AppLayout from "@/components/layout/app-layout.tsx";
import DashboardPage from "@/pages/dashboard/dashboard-page.tsx";
import NotFoundPage from "@/pages/not-found.tsx";

export const routes: RouteObject[] = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
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
