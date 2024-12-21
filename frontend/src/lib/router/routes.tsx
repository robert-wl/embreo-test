import { RouteObject } from "react-router";
import Page from "@/app/login/page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
  },
];
