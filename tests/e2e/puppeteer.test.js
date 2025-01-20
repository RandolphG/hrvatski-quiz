import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Setup express server to serve our test files
const app = express();
const port = 3000;

// Serve static files from the project directory
app.use(express.static(__dirname));

// Start server
const server = app.listen(port);

describe("Main Class Integration Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch browser
    browser = await puppeteer.launch({
      headless: false, // Set to false to see the browser in action
      slowMo: 100, // Slows down operations by 100ms - helpful for watching tests
      args: ["--window-size=1920,1080"],
    });
  });

  beforeEach(async () => {
    // Create new page for each test
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to test page
    await page.goto(`http://127.0.0.1:${port}/test.html`);

    // Wait for the page to load
    await page.waitForSelector("#categorySelector");
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
    server.close();
  });

  test("dropdown populates with correct categories", async () => {
    const options = await page.$$eval("#categorySelector option", (options) =>
      options.map((option) => ({
        value: option.value,
        text: option.textContent,
      })),
    );

    // Check if first option is the placeholder
    expect(options[0]).toEqual({
      value: "",
      text: "Select a category",
    });

    // Verify other options are populated from chapter_1_questions
    expect(options.length).toBeGreaterThan(1);
  });

  test("selecting category triggers notification", async () => {
    // Select a category
    await page.select("#categorySelector", "test_category");

    // Wait for notification to appear
    const notification = await page.waitForSelector(".notification");
    const notificationText = await page.$eval(
      ".notification",
      (el) => el.textContent,
    );

    expect(notificationText).toContain("test_category");
  });

  test("localStorage updates when selecting categories", async () => {
    // Get initial localStorage data
    const initialData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("quizData")),
    );

    // Select a category
    await page.select("#categorySelector", "test_category");

    // Get updated localStorage data
    const updatedData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("quizData")),
    );

    expect(updatedData.testCounts["test_category"]).toBeGreaterThan(
      initialData.testCounts["test_category"] || 0,
    );
  });

  test("quiz interface updates after category selection", async () => {
    // Select a category
    await page.select("#categorySelector", "test_category");

    // Wait for quiz interface to update
    await page.waitForSelector(".quiz-container");

    // Verify quiz elements are present
    const quizExists = await page.$eval(
      ".quiz-container",
      (el) => el.innerHTML.length > 0,
    );
    expect(quizExists).toBeTruthy();
  });

  // Helper function to take screenshots during tests
  async function takeScreenshot(name) {
    await page.screenshot({
      path: `./test-screenshots/${name}.png`,
      fullPage: true,
    });
  }
});
