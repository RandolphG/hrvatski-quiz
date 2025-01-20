export class ListManager {
  constructor(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data structure provided to ListManager");
    }

    this.data = data;
    this.listContainer = document.querySelector(".risk");
    this.currentSelection = null; // Track current selection

    if (!this.listContainer) {
      throw new Error("Risk container element not found");
    }

    this.addStyles();
  }

  addStyles() {
    if (!document.getElementById("list-manager-styles")) {
      const style = document.createElement("style");
      style.id = "list-manager-styles";
      style.textContent = `
        .risk__description p {
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          margin: 4px 0;
          user-select: none;
        }
        
        .risk__description p:hover {
          background-color: #f0f0f0;
          transform: translateX(5px);
        }

        .risk__description p.selected {
          background-color: #4CAF50;
          color: white;
          font-weight: bold;
        }

        .risk__description p.selected:hover {
          background-color: #45a049;
        }
      `;
      document.head.appendChild(style);
    }
  }

  populateList() {
    try {
      const categories = Object.keys(this.data[0]);
      if (categories.length === 0) {
        console.warn("No categories found in data");
        return;
      }

      this.listContainer.setAttribute("data-risk-score", categories.length);
      const descriptionContainer =
        this.listContainer.querySelector(".risk__description");

      if (!descriptionContainer) {
        throw new Error("Description container not found");
      }

      descriptionContainer.innerHTML = "";

      categories.forEach((category) => {
        const p = document.createElement("p");
        const formattedText = category
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        p.textContent = formattedText;

        // Add click handler for selection
        p.addEventListener("click", () => {
          this.select(p, category);
        });

        descriptionContainer.appendChild(p);
      });
    } catch (error) {
      console.error("Error populating list:", error);
    }
  }

  select(element, category) {
    // If there's a current selection, remove it
    if (this.currentSelection && this.currentSelection.element) {
      this.currentSelection.element.classList.remove("selected");
    }

    // If clicking the same element, deselect it
    if (this.currentSelection && this.currentSelection.element === element) {
      this.currentSelection = null;
    } else {
      // Select the new element
      element.classList.add("selected");
      this.currentSelection = {
        element: element,
        category: category,
      };
    }

    // Dispatch custom event with selection details
    const event = new CustomEvent("categorySelected", {
      detail: {
        category: this.currentSelection?.category || null,
        isSelected: !!this.currentSelection,
      },
      bubbles: true, // Allow event to bubble up through the DOM
    });

    this.listContainer.dispatchEvent(event);

    // Log current selection (optional)
    console.log(
      "Selected category:",
      this.currentSelection?.category || "none",
    );
  }

  // Method to get current selection if needed
  getCurrentSelection() {
    return this.currentSelection?.category || null;
  }

  // Method to programmatically select a category
  selectCategory(category) {
    const descriptionContainer =
      this.listContainer.querySelector(".risk__description");
    const elements = descriptionContainer.querySelectorAll("p");

    for (const element of elements) {
      if (
        element.textContent.toLowerCase().replace(/ /g, "_") ===
        category.toLowerCase()
      ) {
        this.select(element, category);
        break;
      }
    }
  }

  // Method to deselect current selection
  clearSelection() {
    if (this.currentSelection) {
      this.currentSelection.element.classList.remove("selected");
      this.currentSelection = null;

      // Dispatch event for deselection
      const event = new CustomEvent("categorySelected", {
        detail: {
          category: null,
          isSelected: false,
        },
        bubbles: true,
      });

      this.listContainer.dispatchEvent(event);
    }
  }
}
