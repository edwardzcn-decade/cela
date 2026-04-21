function initSectionToggles() {
  const toggles = document.querySelectorAll(".toggle-content");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      const homeList = toggle.closest(".home-list");
      if (!homeList) {
        return;
      }

      const content = homeList.querySelector(".home-list-content");
      if (!content) {
        return;
      }

      const isExpanded = content.classList.toggle("show");
      toggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  });
}

function initSearchToggle() {
  const searchToggleBox = document.getElementById("search-toggle-box");
  const searchToggleModal = document.querySelector("#search-toggle-box .search-toggle-modal");
  const searchToggleInput = document.getElementById("search-toggle-input");
  const searchToggleButton = document.getElementById("search-toggle-button");
  const searchToggleLink = document.querySelector('[data-search-toggle="true"]');

  if (!searchToggleBox || !searchToggleModal || !searchToggleInput || !searchToggleButton || !searchToggleLink) {
    return;
  }

  searchToggleLink.addEventListener("click", function (event) {
    event.preventDefault();
    searchToggleBox.classList.remove("hidden");
    searchToggleInput.focus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      searchToggleBox.classList.add("hidden");
    }
  });

  document.addEventListener("click", function (event) {
    const isClickInside =
      searchToggleModal.contains(event.target) || searchToggleLink.contains(event.target);
    if (!isClickInside) {
      searchToggleBox.classList.add("hidden");
    }
  });

  searchToggleButton.addEventListener("click", function () {
    const searchTerm = searchToggleInput.value.trim();

    if (searchTerm) {
      window.location.assign(`/search/?q=${encodeURIComponent(searchTerm)}`);
    } else {
      alert("Please enter a search term.");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSectionToggles();
  initSearchToggle();
});
