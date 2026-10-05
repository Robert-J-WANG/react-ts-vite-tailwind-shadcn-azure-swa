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

test("persists an explicit theme choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  const switchToDark = page.getByTitle("Switch to dark theme");
  await switchToDark.click();

  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByTitle("Switch to light theme")).toBeVisible();
});
