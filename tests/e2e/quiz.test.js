// tests/e2e/quiz.test.js
const puppeteer = require("puppeteer");

describe("Quiz App E2E Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: "new", // Use new headless mode
      args: ["--no-sandbox"],
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // Assuming your app runs on localhost:3000
    await page.goto("http://127.0.0.1:8080/");
    // Wait for the page to load completely
    await page.waitForSelector(".start_btn");
  });

  afterEach(async () => {
    await page.close();
  });

  test("should load the quiz application", async () => {
    const startButton = await page.$(".start_btn button.start");
    expect(startButton).toBeTruthy();
  });

  test("should start quiz flow", async () => {
    // Click start button
    await page.click(".start_btn button.start");

    // Verify info box appears
    await page.waitForSelector(".info_box.activeInfo");

    // Click continue
    await page.click(".info_box .buttons .restart");

    // Verify quiz box appears
    await page.waitForSelector(".quiz_box.activeQuiz");
  });

  test("should display questions and handle answers", async () => {
    // Start the quiz
    await page.click(".start_btn button.start");
    await page.click(".info_box .buttons .restart");

    // Wait for first question
    await page.waitForSelector(".que_text");

    // Get question text
    const questionText = await page.$eval(".que_text", (el) => el.textContent);
    expect(questionText).toBeTruthy();

    // Click an answer
    const options = await page.$$(".option_list .option");
    await options[0].click();

    // Verify answer was processed (check for correct/incorrect class)
    const hasResult = await page.$eval(
      ".option_list .option",
      (el) =>
        el.classList.contains("correct") || el.classList.contains("incorrect"),
    );
    expect(hasResult).toBeTruthy();
  });

  test("should handle timer functionality", async () => {
    // Start quiz
    await page.click(".start_btn button.start");
    await page.click(".info_box .buttons .restart");

    // Check initial timer value
    const initialTime = await page.$eval(".timer_sec", (el) => el.textContent);
    expect(initialTime).toBe("30");

    // Wait for 2 seconds and check if timer decreased
    await page.waitForTimeout(2000);
    const newTime = await page.$eval(".timer_sec", (el) =>
      parseInt(el.textContent),
    );
    expect(newTime).toBeLessThan(30);
  });

  test("should complete quiz and show results", async () => {
    // Start quiz
    await page.click(".start_btn button.start");
    await page.click(".info_box .buttons .restart");

    // Answer all questions
    while (true) {
      try {
        // Wait for options to be clickable
        await page.waitForSelector(".option_list .option");

        // Click first option
        const options = await page.$$(".option_list .option");
        await options[0].click();

        // Check if there's a next button and click it
        const nextButton = await page.$(".next_btn.show");
        if (!nextButton) break;
        await nextButton.click();
      } catch (e) {
        break; // Exit if we can't find more questions
      }
    }

    // Verify results are shown
    await page.waitForSelector(".result_box.activeResult");
    const scoreText = await page.$eval(".score_text", (el) => el.textContent);
    expect(scoreText).toBeTruthy();
  });

  test("should show statistics", async () => {
    // Click stats button
    await page.click(".start_btn button.stats");

    // Verify profile box appears
    await page.waitForSelector(".profile_box.activeProfile");

    // Check if stats are displayed
    const statsExist = await page.$eval(
      ".profile_box .stat",
      (el) => el.textContent,
    );
    expect(statsExist).toBeTruthy();

    // Close stats
    await page.click(".profile_box .profile-buttons .quit");

    // Verify profile box is hidden
    const isHidden = await page.$eval(
      ".profile_box",
      (el) => !el.classList.contains("activeProfile"),
    );
    expect(isHidden).toBeTruthy();
  });
});
