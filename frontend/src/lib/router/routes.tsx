import { RouteObject } from "react-router";
import LoginPage from "@/app/login/login-page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
];
