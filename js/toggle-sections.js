document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".toggle-content");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      const content = toggle
        .closest(".home-list")
        .querySelector(".home-list-content");

      if (content.classList.contains("show")) {
        content.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        content.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
});
