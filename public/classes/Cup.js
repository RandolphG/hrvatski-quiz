export default class DrinkTracker {
  constructor(initialPercentage = 0) {
    this.smallCups = document.querySelectorAll(".cup.small");
    this.liters = document.getElementById("liters");
    this.percentage = document.getElementById("percentage");
    this.remained = document.getElementById("remained");
    this.bigCup = document.querySelector(".cup.big");

    // Bind methods to maintain correct 'this' context
    this.highlightCups = this.highlightCups.bind(this);
    this.updateBigCup = this.updateBigCup.bind(this);
    this.setPercentage = this.setPercentage.bind(this);

    // Initialize event listeners
    this.initializeEventListeners();

    // Set initial percentage
    this.setPercentage(initialPercentage);
  }

  initializeEventListeners() {
    this.smallCups.forEach((cup, idx) => {
      cup.addEventListener("click", () => this.highlightCups(idx));
    });
  }

  setPercentage(percentage) {
    // Ensure percentage is between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    // Calculate how many cups should be filled based on percentage
    const totalCups = this.smallCups.length;
    const cupsToFill = Math.round((percentage / 100) * totalCups);

    // Update cup states
    this.smallCups.forEach((cup, idx) => {
      if (idx < cupsToFill) {
        cup.classList.add("full");
      } else {
        cup.classList.remove("full");
      }
    });

    this.updateBigCup();
    return this; // Allow method chaining
  }

  highlightCups(idx) {
    try {
      // Check if clicked cup is full and next cup isn't
      if (
        this.smallCups[idx].classList.contains("full") &&
        !this.smallCups[idx].nextElementSibling?.classList.contains("full")
      ) {
        idx--;
      }

      // Calculate percentage based on clicked cup
      const percentage = ((idx + 1) / this.smallCups.length) * 100;
      this.setPercentage(percentage);
    } catch (err) {
      console.error("Error in highlightCups:", err);
    }
  }

  updateBigCup() {
    const fullCupsCount = document.querySelectorAll(".cup.small.full").length;
    const totalCups = this.smallCups.length;
    const cupHeight = this.bigCup.offsetHeight;
    const percentageFilled = fullCupsCount / totalCups;

    // Update percentage display
    const percentageHeight = percentageFilled * cupHeight;
    this.percentage.style.height = `${percentageHeight}px`;
    this.percentage.querySelector("span").textContent =
      `${percentageFilled * 100}%`;

    // Update CSS custom property for styling
    this.bigCup.style.setProperty("--percentage", percentageFilled);

    // Update remained section
    const remainedHeight = (1 - percentageFilled) * cupHeight;
    this.remained.style.height = `${remainedHeight}px`;

    // Update liters display (assuming each small cup is 250ml)
    const remainingLiters = 2 - (250 * fullCupsCount) / 1000;
    this.liters.innerText = `${remainingLiters}L`;

    // Handle visibility states
    if (fullCupsCount === 0) {
      this.percentage.style.visibility = "hidden";
      this.percentage.style.height = "0";
    } else {
      this.percentage.style.visibility = "visible";
    }

    if (fullCupsCount === totalCups) {
      this.remained.style.visibility = "hidden";
      this.remained.style.height = "0";
    } else {
      this.remained.style.visibility = "visible";
    }

    return this; // Allow method chaining
  }

  getCurrentPercentage() {
    const fullCupsCount = document.querySelectorAll(".cup.small.full").length;
    return (fullCupsCount / this.smallCups.length) * 100;
  }
}

// Usage examples:
/*
// Initialize with 0%
const tracker = new DrinkTracker();

// Initialize with 50%
const tracker = new DrinkTracker(50);

// Update percentage later
tracker.setPercentage(75);

// Get current percentage
const currentPercentage = tracker.getCurrentPercentage();
*/
