import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";
import AppLayout from "@/components/layout/app-layout.tsx";
import DashboardPage from "@/pages/dashboard/dashboard-page.tsx";
import NotFoundPage from "@/pages/not-found.tsx";
import ErrorBoundaryLayout from "@/components/layout/error-boundary-layout.tsx";

export const routes: RouteObject[] = [
  {
    element: <ErrorBoundaryLayout />,
    children: [
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
    ],
  },
];
