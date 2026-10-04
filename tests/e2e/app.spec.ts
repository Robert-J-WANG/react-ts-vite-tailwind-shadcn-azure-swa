import { expect, test } from "@playwright/test";

test("loads the home route", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Application Template");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Application template",
    }),
  ).toBeVisible();
});

test("navigates to the secondary route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Open secondary route" }).click();

  await expect(page).toHaveURL(/\/secondary$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Secondary route",
    }),
  ).toBeVisible();
});

test("shows the not-found page for an unknown URL", async ({ page }) => {
  await page.goto("/unknown-page");

  await expect(page).toHaveTitle("Page not found | Application Template");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Page not found",
    }),
  ).toBeVisible();
});
