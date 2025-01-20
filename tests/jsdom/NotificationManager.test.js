import NotificationManager from "../../public/classes/NotificationManager";

describe("NotificationManager", () => {
  // Mock DOM setup
  let container;
  let manager;

  beforeEach(() => {
    // Setup DOM element
    container = document.createElement("div");
    container.id = "toasts";
    document.body.appendChild(container);

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Cleanup DOM
    document.body.removeChild(container);
    // Restore setTimeout
    jest.useRealTimers();
  });

  describe("constructor", () => {
    it("should initialize with correct category message", () => {
      manager = new NotificationManager("test-category");
      expect(manager.messages).toEqual(["You selected test-category"]);
    });

    it("should have correct type configurations", () => {
      manager = new NotificationManager("test");
      expect(manager.typeConfig).toHaveProperty("success");
      expect(manager.typeConfig).toHaveProperty("error");
      expect(manager.typeConfig).toHaveProperty("info");
      expect(manager.typeConfig).toHaveProperty("notif");
    });
  });

  describe("createNotification", () => {
    beforeEach(() => {
      manager = new NotificationManager("test");
    });

    it("should create notification with correct type and classes", () => {
      manager.createNotification("success");
      const toast = container.querySelector(".toast");

      expect(toast).toBeTruthy();
      expect(toast.classList.contains("success")).toBeTruthy();
    });

    it("should use default type when invalid type provided", () => {
      manager.createNotification("invalid-type");
      const toast = container.querySelector(".toast");

      expect(toast.classList.contains("notif")).toBeTruthy();
    });

    it("should set correct icon and title based on type", () => {
      manager.createNotification("error");
      const toast = container.querySelector(".toast");

      expect(
        toast.querySelector("i.fas").classList.contains("fa-circle-xmark"),
      ).toBeTruthy();
      expect(toast.querySelector("span").textContent).toBe("Error");
    });

    it("should remove notification after timeout", () => {
      manager.createNotification("success");
      expect(container.children.length).toBe(1);

      jest.advanceTimersByTime(5000);
      expect(container.children.length).toBe(0);
    });
  });

  describe("getRandomMessage", () => {
    it("should return a message from the messages array", () => {
      manager = new NotificationManager("test");
      const message = manager.getRandomMessage();
      expect(manager.messages).toContain(message);
    });
  });

  describe("setMessages", () => {
    beforeEach(() => {
      manager = new NotificationManager("test");
    });

    it("should update messages when valid array provided", () => {
      const newMessages = ["Message 1", "Message 2"];
      manager.setMessages(newMessages);
      expect(manager.messages).toEqual(newMessages);
    });

    it("should not update messages when non-array provided", () => {
      const originalMessages = [...manager.messages];
      manager.setMessages("not an array");
      expect(manager.messages).toEqual(originalMessages);
    });
  });

  describe("setDuration", () => {
    it("should update duration value", () => {
      manager = new NotificationManager("test");
      manager.setDuration(3000);
      expect(manager.duration).toBe(3000);
    });
  });

  describe("initialize", () => {
    it("should create a success notification on initialization", () => {
      manager = new NotificationManager("test");
      const toast = container.querySelector(".toast.success");
      expect(toast).toBeTruthy();
    });
  });
});
