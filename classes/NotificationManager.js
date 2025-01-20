export default class NotificationManager {
  constructor(category) {
    this.toasts = document.getElementById("toasts");
    this.messages = [`You selected ${category}`];

    this.types = ["notif", "info", "success", "error"];
    this.typeConfig = {
      success: {
        icon: "circle-check",
        title: "Success",
        color: "var(--success-color)",
      },
      error: {
        icon: "circle-xmark",
        title: "Error",
        color: "var(--error-color)",
      },
      info: {
        icon: "circle-info",
        title: "Info",
        color: "var(--primary-color)",
      },
      notif: {
        icon: "circle-dot",
        title: "Default",
        color: "#929292",
      },
    };

    this.initialize();
  }

  initialize() {
    this.createNotification("success");
  }

  createNotification(type = "notif") {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.classList.add(type);

    const config = this.typeConfig[type] || this.typeConfig.notif;
    toast.style.setProperty("--theme", config.color);

    toast.innerHTML = `
      <i class="fas fa-${config.icon}"></i>
      <p><span>${config.title}</span>${this.getRandomMessage()}</p>
    `;

    this.toasts.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  getRandomMessage() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  setMessages(messages) {
    if (Array.isArray(messages)) {
      this.messages = messages;
    }
  }

  setDuration(duration) {
    this.duration = duration;
  }
}
