import { RouteObject } from "react-router";
import LoginPage from "@/pages/auth/login-page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
];
