function initSearchOverlay() {
  const searchPageUrl = document.body.dataset.searchPageUrl;
  const searchToggleBox = document.getElementById("search-toggle-box");
  const searchToggleModal = document.querySelector("#search-toggle-box .search-toggle-modal");
  const searchToggleInput = document.getElementById("search-toggle-input");
  const searchToggleButton = document.getElementById("search-toggle-button");
  const searchToggleLink = document.querySelector('[data-search-toggle="true"]');

  if (
    !searchToggleBox ||
    !searchToggleModal ||
    !searchToggleInput ||
    !searchToggleButton ||
    !searchToggleLink ||
    !searchPageUrl
  ) {
    return;
  }

  function closeSearchOverlay() {
    searchToggleBox.classList.add("hidden");
  }

  function submitSearch() {
    const searchTerm = searchToggleInput.value.trim();
    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }
    window.location.assign(`${searchPageUrl}?q=${encodeURIComponent(searchTerm)}`);
  }

  searchToggleLink.addEventListener("click", function (event) {
    event.preventDefault();
    searchToggleBox.classList.remove("hidden");
    searchToggleInput.focus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSearchOverlay();
      return;
    }

    if (event.key === "Enter" && document.activeElement === searchToggleInput) {
      submitSearch();
    }
  });

  document.addEventListener("click", function (event) {
    const isClickInside =
      searchToggleModal.contains(event.target) || searchToggleLink.contains(event.target);
    if (!isClickInside) {
      closeSearchOverlay();
    }
  });

  searchToggleButton.addEventListener("click", submitSearch);
}

document.addEventListener("DOMContentLoaded", initSearchOverlay);
