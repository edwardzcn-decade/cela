function initMenuScrollPersistence() {
  const menu = document.getElementById("menu");
  if (!menu) {
    return;
  }

  menu.scrollLeft = Number(localStorage.getItem("menu-scroll-position") || 0);
  menu.addEventListener("scroll", function () {
    localStorage.setItem("menu-scroll-position", String(menu.scrollLeft));
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const href = anchor.getAttribute("href");
      const id = href ? href.slice(1) : "";
      const target = id ? document.querySelector(`[id='${decodeURIComponent(id)}']`) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });

      if (id === "top") {
        history.replaceState(null, "", " ");
      } else {
        history.pushState(null, "", `#${id}`);
      }
    });
  });
}

function initTopLink() {
  const topLink = document.getElementById("top-link");
  if (!topLink) {
    return;
  }

  function syncTopLink() {
    const shouldShow = document.body.scrollTop > 800 || document.documentElement.scrollTop > 800;
    topLink.classList.toggle("is-visible", shouldShow);
  }

  syncTopLink();
  window.addEventListener("scroll", syncTopLink, { passive: true });
}

function showLanguageToast(message) {
  let toast = document.getElementById("language-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "language-toast";
    toast.className = "language-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toast.hideTimer);
  toast.hideTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 1800);
}

function initLanguageSwitcher() {
  document.querySelectorAll("[data-missing-translation='true']").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showLanguageToast(link.dataset.missingTranslationMessage || "Translation is not available");
    });
  });
}

function initThemeToggle() {
  if (document.body.dataset.showThemeToggle !== "true") {
    return;
  }
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-scheme") || "catppuccin-latte";
    const next = current === "catppuccin-latte" ? "catppuccin-macchiato" : "catppuccin-latte";
    applyScheme(next);
    const select = document.getElementById("scheme-select");
    if (select) {
      select.value = next;
    }
  });
}

function initCodeCopyButtons() {
  if (document.body.dataset.showCodeCopyButtons !== "true") {
    return;
  }

  document.querySelectorAll("pre > code").forEach(function (codeBlock) {
    const container = codeBlock.parentNode.parentNode;
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-code");
    copyButton.type = "button";
    copyButton.textContent = "copy";

    function copyingDone() {
      copyButton.textContent = "copied!";
      window.setTimeout(function () {
        copyButton.textContent = "copy";
      }, 2000);
    }

    copyButton.addEventListener("click", function () {
      if ("clipboard" in navigator) {
        let content = codeBlock.textContent;
        if (codeBlock.firstChild && codeBlock.firstChild.tagName === "TABLE") {
          content = Array.from(codeBlock.firstChild.getElementsByTagName("span"))
            .map(function (span) {
              return span.textContent;
            })
            .join("");
        }
        navigator.clipboard.writeText(content);
        copyingDone();
        return;
      }

      const range = document.createRange();
      range.selectNodeContents(codeBlock);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand("copy");
        copyingDone();
      } catch (_) {
        // Ignore browsers that reject the legacy copy path.
      }
      selection.removeRange(range);
    });

    if (container.classList.contains("highlight")) {
      container.appendChild(copyButton);
    } else if (container.parentNode.firstChild === container) {
      return;
    } else if (
      codeBlock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === "TABLE"
    ) {
      codeBlock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copyButton);
    } else {
      codeBlock.parentNode.appendChild(copyButton);
    }
  });
}

function applyScheme(scheme) {
  document.documentElement.setAttribute("data-scheme", scheme);
  const isDark = scheme !== "catppuccin-latte";
  document.documentElement.classList.toggle("dark", isDark);
  document.body.classList.toggle("dark", isDark);
  if (document.body.dataset.rememberChoice === "true") {
    localStorage.setItem("pref-scheme", scheme);
  }
}

function initSchemeSelect() {
  if (document.body.dataset.showThemeToggle !== "true") {
    return;
  }
  const select = document.getElementById("scheme-select");
  if (!select) {
    return;
  }

  const saved = (document.body.dataset.rememberChoice === "true" && localStorage.getItem("pref-scheme")) || "catppuccin-latte";
  select.value = saved;

  select.addEventListener("change", function () {
    applyScheme(select.value);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMenuScrollPersistence();
  initSmoothAnchors();
  initTopLink();
  initLanguageSwitcher();
  initThemeToggle();
  initCodeCopyButtons();
  initSchemeSelect();
});
