import { jest } from "@jest/globals";
import { Main } from "../../public/main";
import Quiz from "../../public/classes/Quiz";
import NotificationManager from "../../public/classes/NotificationManager";
import { chapter_1_questions, defaultData } from "../../public/library";

// Mock dependencies
jest.mock("../../public/classes/Quiz");
jest.mock("../../public/classes/NotificationManager");

describe("Main Class", () => {
  // Setup mocks before each test
  let localStorageMock;
  let documentMock;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    // Mock DOM elements and methods
    documentMock = {
      getElementById: jest.fn(() => ({
        addEventListener: jest.fn(),
        innerHTML: "",
        appendChild: jest.fn(),
      })),
      createElement: jest.fn(() => ({
        value: "",
        textContent: "",
        disabled: false,
        selected: false,
      })),
    };
    global.document = documentMock;

    // Mock console
    global.console = {
      log: jest.fn(),
    };

    // Clear mock calls
    Quiz.mockClear();
    NotificationManager.mockClear();
  });

  test("constructor initializes correctly with stored quiz data", () => {
    // Setup
    const storedQuizData = {
      timeSpent: 100,
      testCounts: { test1: 5 },
      scores: [80, 90],
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedQuizData));

    // Execute
    const main = new Main();

    // Assert
    expect(localStorageMock.getItem).toHaveBeenCalledWith("quizData");
    expect(Quiz).toHaveBeenCalledWith(chapter_1_questions, storedQuizData);
    expect(global.window.quiz).toBeDefined();
    expect(console.log).toHaveBeenCalled();
  });

  test("constructor initializes with default data when no stored data exists", () => {
    // Setup
    localStorageMock.getItem.mockReturnValue(null);

    // Execute
    const main = new Main();

    // Assert
    expect(Quiz).toHaveBeenCalledWith(chapter_1_questions, defaultData);
  });

  test("getQuizData returns stored data when available", () => {
    // Setup
    const storedData = {
      timeSpent: 50,
      testCounts: { test1: 3 },
      scores: [75, 85],
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));
    const main = new Main();

    // Execute
    const result = main.getQuizData();

    // Assert
    expect(result).toEqual(storedData);
  });

  test("getQuizData returns default data when no stored data exists", () => {
    // Setup
    localStorageMock.getItem.mockReturnValue(null);
    const main = new Main();

    // Execute
    const result = main.getQuizData();

    // Assert
    expect(result).toEqual(defaultData);
  });

  test("populateDropdown creates correct options from categories", () => {
    // Setup
    const mockDropdown = {
      innerHTML: "",
      appendChild: jest.fn(),
    };
    documentMock.getElementById.mockReturnValue(mockDropdown);
    const main = new Main();

    // Execute
    main.populateDropdown();

    // Assert
    expect(documentMock.getElementById).toHaveBeenCalledWith(
      "categorySelector",
    );
    expect(documentMock.createElement).toHaveBeenCalledTimes(
      Object.keys(chapter_1_questions[0]).length + 1, // +1 for placeholder
    );
    expect(mockDropdown.appendChild).toHaveBeenCalled();
  });

  test("setupCategoryDropdown handles category selection correctly", () => {
    // Setup
    const mockDropdown = {
      addEventListener: jest.fn(),
    };
    documentMock.getElementById.mockReturnValue(mockDropdown);
    const main = new Main();
    const mockQuiz = {
      setCategory: jest.fn(),
      incrementTestCount: jest.fn(),
    };
    main.quiz = mockQuiz;

    // Get the event listener callback
    const listenerCallback = mockDropdown.addEventListener.mock.calls[0][1];

    // Execute
    listenerCallback({ target: { value: "test_category" } });

    // Assert
    expect(mockQuiz.setCategory).toHaveBeenCalledWith("test_category");
    expect(mockQuiz.incrementTestCount).toHaveBeenCalledWith("test_category");
    expect(NotificationManager).toHaveBeenCalledWith("test_category");
  });

  test("startQuiz logs readiness message", () => {
    // Setup
    const main = new Main();

    // Execute
    main.startQuiz();

    // Assert
    expect(console.log).toHaveBeenCalledWith(
      "Quiz game is ready! Please click the start button to begin.",
    );
  });
});
