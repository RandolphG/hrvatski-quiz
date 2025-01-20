export class DropdownManager {
  constructor(elementId) {
    this.dropdown = document.getElementById(elementId);
    this.startButton = document.querySelector(".start_btn .start");

    if (!this.dropdown) {
      throw new Error(`Dropdown element with id '${elementId}' not found`);
    }

    if (!this.startButton) {
      throw new Error("Start button not found");
    }

    // Initially disable the start button
    this.disableStartButton();
  }

  populate(categories) {
    this.clear();
    this.addPlaceholder();

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.replace(/_/g, " ");
      this.dropdown.appendChild(option);
    });
  }

  clear() {
    this.dropdown.innerHTML = "";
  }

  addPlaceholder() {
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Select a category";
    placeholderOption.value = "";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    this.dropdown.appendChild(placeholderOption);
  }

  onChange(callback) {
    this.dropdown.addEventListener("change", (event) => {
      if (event.target.value) {
        this.enableStartButton();
      } else {
        this.disableStartButton();
      }
      callback(event);
    });
  }

  enableStartButton() {
    this.startButton.disabled = false;
    this.startButton.style.opacity = "1";
    this.startButton.style.cursor = "pointer";
  }

  disableStartButton() {
    this.startButton.disabled = true;
    this.startButton.style.opacity = "0.5";
    this.startButton.style.cursor = "not-allowed";
  }
}
