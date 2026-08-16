import { test, expect } from "@playwright/test";

test.describe("Parent Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("opens dashboard after 5 logo taps", async ({ page }) => {
    const logoButton = page.locator('button img[alt="Petit Monde"]').locator("..");
    for (let i = 0; i < 5; i++) {
      await logoButton.click();
    }
    await expect(page.getByText("Tableau de bord")).toBeVisible();
  });

  test("dashboard shows stats", async ({ page }) => {
    const logoButton = page.locator('button img[alt="Petit Monde"]').locator("..");
    for (let i = 0; i < 5; i++) {
      await logoButton.click();
    }
    await expect(page.getByText("Sessions")).toBeVisible();
    await expect(page.getByText("Streak")).toBeVisible();
    await expect(page.getByText("Global")).toBeVisible();
  });

  test("dashboard shows settings", async ({ page }) => {
    const logoButton = page.locator('button img[alt="Petit Monde"]').locator("..");
    for (let i = 0; i < 5; i++) {
      await logoButton.click();
    }
    await expect(page.getByRole("heading", { name: "Paramètres" })).toBeVisible();
    await expect(page.getByText("Durée max")).toBeVisible();
    await expect(page.getByText("Langue")).toBeVisible();
  });

  test("dashboard closes with X button", async ({ page }) => {
    const logoButton = page.locator('button img[alt="Petit Monde"]').locator("..");
    for (let i = 0; i < 5; i++) {
      await logoButton.click();
    }
    await expect(page.getByText("Tableau de bord")).toBeVisible();
    await page.locator("button").filter({ has: page.locator("svg") }).last().click();
    await expect(page.getByText("Tableau de bord")).not.toBeVisible();
  });
});

test.describe("Language Selector", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("language selector is visible", async ({ page }) => {
    const langSelector = page.locator("button").filter({ hasText: /FR|ES/ });
    await expect(langSelector.first()).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("renders on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Petit Monde");
  });

  test("renders on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Petit Monde");
  });

  test("renders on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Petit Monde");
  });

  test("bottom nav is fixed on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const nav = page.locator("nav").last();
    await expect(nav).toBeVisible();
    await expect(nav).toHaveClass(/fixed/);
  });
});

test.describe("Accessibility", () => {
  test("all navigation links have visible labels", async ({ page }) => {
    await page.goto("/");
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      await expect(link.locator("span")).toBeVisible();
    }
  });

  test("logo button has alt text on image", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('img[alt="Petit Monde"]');
    await expect(logo).toBeVisible();
  });
});

test.describe("Performance", () => {
  test("page loads within 3 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(3000);
  });

  test("no console errors on page load", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
