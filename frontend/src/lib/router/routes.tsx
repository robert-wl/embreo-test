import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";
import AppLayout from "@/components/layout/app-layout.tsx";
import DashboardPage from "@/pages/dashboard/dashboard-page.tsx";
import NotFoundPage from "@/pages/not-found-page.tsx";
import ErrorBoundaryLayout from "@/components/layout/error-boundary-layout.tsx";
import AuthMiddleware from "@/components/middleware/auth-middleware.tsx";

export const routes: RouteObject[] = [
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        element: <AuthMiddleware required={false} />,
        children: [
          {
            path: "/auth",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <AuthMiddleware required={true} />,
        children: [
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
    ],
  },
];
