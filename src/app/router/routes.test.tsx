import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { describe, expect, it, vi } from "vitest";

import { RootLayout } from "@/app/RootLayout";
import { routes } from "@/app/router/routes";
import { RouteErrorPage } from "@/pages/RouteErrorPage";

function renderRoute(pathname: string) {
  const router = createMemoryRouter(routes, {
    initialEntries: [pathname],
  });

  render(<RouterProvider router={router} />);
}

describe("application routes", () => {
  it("renders the home route", async () => {
    renderRoute("/");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Application template",
      }),
    ).toBeInTheDocument();
  });

  it("renders the secondary route", async () => {
    renderRoute("/secondary");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Secondary route",
      }),
    ).toBeInTheDocument();
  });

  it("renders the not-found page for an unknown route", async () => {
    renderRoute("/unknown-page");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Page not found",
      }),
    ).toBeInTheDocument();
  });

  it("renders the route error without exposing its message", async () => {
    function BrokenPage(): never {
      throw new Error("Expected test error");
    }

    const router = createMemoryRouter(
      [
        {
          path: "/",
          Component: RootLayout,
          children: [
            {
              index: true,
              ErrorBoundary: RouteErrorPage,
              Component: BrokenPage,
            },
          ],
        },
      ],
      {
        initialEntries: ["/"],
      },
    );

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    try {
      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: "Something went wrong",
        }),
      ).toBeInTheDocument();
      expect(screen.queryByText("Expected test error")).not.toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  });
});
