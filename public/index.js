// index.js
import { initializeApp } from "./classes/Main.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  document.querySelector(".risks").addEventListener("click", function (e) {
    if (e.target.classList.contains("risk")) {
      const clickedItem = e.target;

      // Check if the clicked item is already open
      const isAlreadyOpened = clickedItem.classList.contains("is-opened");

      // Close all opened elements
      document.querySelectorAll(".risk.is-opened").forEach((item) => {
        item.classList.remove("is-opened");
      });

      // Toggle the clicked element only if it wasn't already open
      if (!isAlreadyOpened) {
        clickedItem.classList.add("is-opened");
      }
    }
  });
});
