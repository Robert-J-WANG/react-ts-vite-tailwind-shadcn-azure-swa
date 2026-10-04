import type { RouteObject } from "react-router";

import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RouteErrorPage } from "@/pages/RouteErrorPage";
import { SecondaryPage } from "@/pages/SecondaryPage";

export const routes = [
  {
    path: "/",
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "secondary",
        Component: SecondaryPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
] satisfies RouteObject[];
