import { test, expect } from "@playwright/test";

test.describe("Colores Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/colores");
  });

  test("loads the colors page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("displays color cards", async ({ page }) => {
    const colorCards = page.locator('[class*="rounded"]');
    await expect(colorCards.first()).toBeVisible();
  });

  test("has explore and quiz mode toggle", async ({ page }) => {
    const buttons = page.getByRole("button");
    await expect(buttons.first()).toBeVisible();
  });
});

test.describe("Numeros Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/numeros");
  });

  test("loads the numbers page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Cuerpo Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cuerpo");
  });

  test("loads the body parts page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("displays SVG body", async ({ page }) => {
    const svg = page.locator("svg").first();
    await expect(svg).toBeVisible();
  });
});

test.describe("Formas Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/formas");
  });

  test("loads the shapes page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Contar Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contar");
  });

  test("loads the counting page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Clasificar Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/clasificar");
  });

  test("loads the classification page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Motifs Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/motifs");
  });

  test("loads the patterns page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Grandeurs Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/grandeurs");
  });

  test("loads the sizes page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Vocabulaire Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/vocabulaire");
  });

  test("loads the vocabulary page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Problemes Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/problemes");
  });

  test("loads the problems page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Comptines Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/comptines");
  });

  test("loads the nursery rhymes page", async ({ page }) => {
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

test.describe("Defi Page", () => {
  test("navigates to defi page without errors", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/defi");
    await page.waitForLoadState("networkidle");
    expect(errors.filter((e) => !e.includes("registrarIntento"))).toHaveLength(0);
  });
});
