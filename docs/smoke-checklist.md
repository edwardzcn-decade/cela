# Cela Smoke Checklist

Use this checklist after CSS or template changes to confirm the static theme
still matches the current baseline.

## Baseline Pages

- Home: `/`
- Single post: `/blog/example/`
- Taxonomy list: `/tags/`
- Taxonomy single: `/tags/rust/`
- Search: `/search/`
- Robot: `/robot/`

## Interaction Checks

- Search overlay opens from the header and closes on outside click or `Escape`.
- Search page loads the search index and renders result cards for a query.
- Theme toggle switches between light and dark and persists in local storage.
- Home page collapsible lists open and close without layout breakage.
- Code block copy buttons still appear and copy content.
- Navigation links still resolve correctly on home, post, taxonomy, search, and robot pages.

## Build Checks

- `npm run build:css`
- `zola check --skip-external-links`
- `zola build`
