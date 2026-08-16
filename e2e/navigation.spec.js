import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigates to Couleurs page", async ({ page }) => {
    await page.click('a[href="/colores"]');
    await expect(page).toHaveURL(/\/colores/);
  });

  test("navigates to Nombres page", async ({ page }) => {
    await page.click('a[href="/numeros"]');
    await expect(page).toHaveURL(/\/numeros/);
  });

  test("navigates to Corps page", async ({ page }) => {
    await page.click('a[href="/cuerpo"]');
    await expect(page).toHaveURL(/\/cuerpo/);
  });

  test("navigates to Formes page", async ({ page }) => {
    await page.click('a[href="/formas"]');
    await expect(page).toHaveURL(/\/formas/);
  });

  test("navigates to Compter page", async ({ page }) => {
    await page.click('a[href="/contar"]');
    await expect(page).toHaveURL(/\/contar/);
  });

  test("navigates to Trier page", async ({ page }) => {
    await page.click('a[href="/clasificar"]');
    await expect(page).toHaveURL(/\/clasificar/);
  });

  test("navigates to Motifs page", async ({ page }) => {
    await page.click('a[href="/motifs"]');
    await expect(page).toHaveURL(/\/motifs/);
  });

  test("navigates to Grandeurs page", async ({ page }) => {
    await page.click('a[href="/grandeurs"]');
    await expect(page).toHaveURL(/\/grandeurs/);
  });

  test("navigates to Vocabulaire page", async ({ page }) => {
    await page.click('a[href="/vocabulaire"]');
    await expect(page).toHaveURL(/\/vocabulaire/);
  });

  test("navigates to Problèmes page", async ({ page }) => {
    await page.click('a[href="/problemes"]');
    await expect(page).toHaveURL(/\/problemes/);
  });

  test("navigates to Comptines page", async ({ page }) => {
    await page.click('a[href="/comptines"]');
    await expect(page).toHaveURL(/\/comptines/);
  });

  test("navigates to Défi page", async ({ page }) => {
    await page.click('a[href="/defi"]');
    await expect(page).toHaveURL(/\/defi/);
  });

  test("bottom nav highlights active page", async ({ page }) => {
    await page.click('a[href="/colores"]');
    const couleursLink = page.locator('a[href="/colores"]');
    await expect(couleursLink).toHaveClass(/text-muted-blue/);
  });

  test("clicking Maison nav returns to home", async ({ page }) => {
    await page.click('a[href="/colores"]');
    await page.click('a[href="/"]');
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("Petit Monde");
  });
});
