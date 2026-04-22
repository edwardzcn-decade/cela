function debounce(func, wait) {
  let timeoutId;

  return function debounced(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func.apply(context, args), wait);
  };
}

function formatSearchResultItem(item) {
  const title = item.doc && item.doc.title ? item.doc.title : item.ref;
  let summary = "";
  if (item.doc) {
    summary = item.doc.summary || item.doc.description || "";
    if (!summary && item.doc.body) {
      summary =
        item.doc.body.slice(0, 140) + (item.doc.body.length > 140 ? "…" : "");
    }
  }
  return (
    '<article class="post-entry">' +
    '<header class="entry-header">' +
    '<h3>'+
    title +
    "&nbsp;»</h3></header>" +
    (summary ? '<div class="entry-content"><p>' + summary + "</p></div>" : "") +
    '<a class="entry-link" href="' +
    item.ref +
    '" aria-label="' +
    title +
    '"></a>' +
    '</article>'
  );
}

function normalizeTerm(term) {
  return term.toLowerCase().split(/\s+/).filter(Boolean);
}

function documentMatches(doc, terms) {
  if (!terms.length) {
    return false;
  }

  const haystack = ((doc.title || "") + " " + (doc.body || "")).toLowerCase();
  for (let i = 0; i < terms.length; i += 1) {
    if (haystack.indexOf(terms[i]) === -1) {
      return false;
    }
  }
  return true;
}

function initSearch() {
  const searchIndexJsonUrl = document.body.dataset.searchIndexJsonUrl;
  const searchIndexJsUrl = document.body.dataset.searchIndexJsUrl;
  const input = document.getElementById("searchInput");
  const resultsList = document.getElementById("searchResults");
  if (!input || !resultsList || !searchIndexJsonUrl || !searchIndexJsUrl) {
    return; // No search DOM on this page.
  }

  const MAX_ITEMS = 10;
  let currentTerm = "";
  let indexPromise = null;

  async function initIndex() {
    if (!indexPromise) {
      indexPromise = loadIndex();
    }
    return indexPromise;
  }

  async function loadIndex() {
    try {
      const jsonResponse = await fetch(searchIndexJsonUrl);
      if (
        jsonResponse.ok &&
        jsonResponse.headers.get("content-type")?.includes("application/json")
      ) {
        const data = await jsonResponse.json();
        return Array.isArray(data) ? data : data.docs || [];
      }
    } catch (_) {
      // Fall back to the JS index format below.
    }

    try {
      const jsResponse = await fetch(searchIndexJsUrl);
      const text = await jsResponse.text();
      const prefix = "window.searchIndex = ";
      if (text.startsWith(prefix)) {
        const parsed = JSON.parse(text.slice(prefix.length));
        const docsObj = (parsed.documentStore && parsed.documentStore.docs) || {};
        return Object.keys(docsObj).map(function (key) {
          const doc = docsObj[key];
          return {
            title: doc.title || key,
            body: doc.body || "",
            summary: doc.summary || "",
            permalink: key,
            url: key,
          };
        });
      }
    } catch (err) {
      console.error("Failed to load search index", err);
    }
    return [];
  }

  async function performSearch(term) {
    if (!term) {
      resultsList.style.display = "none";
      resultsList.innerHTML = "";
      return;
    }
    const docs = await initIndex();
    const terms = normalizeTerm(term);
    const results = [];

    for (let i = 0; i < docs.length; i += 1) {
      if (documentMatches(docs[i], terms)) {
        results.push({ ref: docs[i].permalink || docs[i].url, doc: docs[i] });
      }
    }
    if (!results.length) {
      resultsList.style.display = "none";
      resultsList.innerHTML = "";
      return;
    }
    resultsList.style.display = "block";
    resultsList.innerHTML = results
      .slice(0, MAX_ITEMS)
      .map(formatSearchResultItem)
      .join("");
  }

  const debounced = debounce(function () {
    const term = input.value.trim();
    if (term === currentTerm) {
      return;
    }
    currentTerm = term;
    void performSearch(term);
  }, 150);

  input.addEventListener("input", debounced);

  window.addEventListener("click", function (event) {
    if (
      resultsList.style.display === "block" &&
      !resultsList.contains(event.target) &&
      event.target !== input
    ) {
      resultsList.style.display = "none";
    }
  });

  const params = new URLSearchParams(window.location.search);
  const initial = params.get("q");
  if (initial) {
    input.value = initial;
    currentTerm = "";
    void performSearch(initial);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSearch);
} else {
  initSearch();
}
