import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and displays Petit Monde title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Petit Monde");
  });

  test("displays the logo image", async ({ page }) => {
    const logo = page.locator('button img[alt="Petit Monde"]');
    await expect(logo).toBeVisible();
  });

  test("displays subtitle", async ({ page }) => {
    await expect(page.getByText("Apprends en français et en espagnol")).toBeVisible();
  });

  test("bottom navigation bar is visible", async ({ page }) => {
    const nav = page.locator("nav").last();
    await expect(nav).toBeVisible();
  });

  test("shows 5 nav items", async ({ page }) => {
    const navLinks = page.locator("nav a");
    await expect(navLinks).toHaveCount(5);
  });

  test("displays all 12 section cards", async ({ page }) => {
    const cards = page.locator('.grid a[href]');
    await expect(cards).toHaveCount(12);
  });

  test("section cards have correct labels", async ({ page }) => {
    const grid = page.locator(".grid");
    await expect(grid.getByText("🎨")).toBeVisible();
    await expect(grid.getByText("🔢")).toBeVisible();
    await expect(grid.getByText("🧍")).toBeVisible();
    await expect(grid.getByText("⭐")).toBeVisible();
  });

  test("parent dashboard hint is visible", async ({ page }) => {
    await expect(page.getByText("Touche le logo 5 fois")).toBeVisible();
  });

  test("logo tap opens parent dashboard after 5 taps", async ({ page }) => {
    const logoButton = page.locator('button img[alt="Petit Monde"]').locator("..");
    for (let i = 0; i < 5; i++) {
      await logoButton.click();
    }
    await expect(page.getByText("Tableau de bord")).toBeVisible();
  });
});
