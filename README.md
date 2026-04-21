# Cela

<p align="center">
  <a href="https://edwardzcn-decade.github.io/cela"><img src="https://img.shields.io/badge/Cela-f8f8f8?style=for-the-badge"></a>
  <a href="https://www.getzola.org"><img src="https://img.shields.io/badge/Zola-f8f8f8?style=for-the-badge&logo=zola&logoColor=black"></a>
</p>

*Cela* is a simple, lightweight Zola theme, inspired by [Hugo PaperMod](https://github.com/adityatelange/hugo-PaperMod).

The style sheet is adapted from [Catppuccin](https://github.com/catppuccin/catppuccin).
If you like it, please give it a 🌟 on GitHub. Thanks!

![screenshot](screenshot.png)

---

## Theme Features

+ [x] Catppuccin color theme
+ [x] Light/Dark mode toggle
+ [x] MathJax support
+ [x] Blog RSS feeds
+ [x] Full-text search
+ [x] Robot tools
+ [x] Home page archive grouping (group by year)
+ [ ] Internationalization (i18n)

### Tags, Categories, and Taxonomies

Cela provides Hexo/Hugo-like `tags` and `categories`, compatible with Zola `taxonomies`. In front matter:

```toml
[taxonomies]
tags = ["Rust", "Zola"]
categories = ["Programming"]
```

or in YAML style:

```yaml
taxonomies:
  tags: ["Rust", "Zola"]
  categories: ["Programming"]
```

Zola `taxonomies` as recommended are more powerful for structuring your contents. See [zola taxonomies](https://www.getzola.org/documentation/content/taxonomies/) for more information.

## Quick Start

If you only need installation of the theme, skip to [Theme Installation](#theme-installation). Here lists the detail procedures from installing Zola to building a site locally according to [Zola Documentation](https://www.getzola.org/documentation/getting-started/installation/).

### Zola Installation

Cela is developed and validated against `Zola 0.22.1`.

For syntax highlighting on `Zola 0.22.x`, use the nested
`[markdown.highlighting]` table instead of the older flat
`highlight_code` setting. See the official configuration docs:
https://www.getzola.org/documentation/getting-started/configuration/

```bash
# macOS
brew install zola
# Alpine Linux
apk add zola
# Arch Linux
pacman -S zola
# Docker
docker pull ghcr.io/getzola/zola:v0.22.1
```

### Create a Zola site

Creates your first Zola site.

If `myblog` already exists but only contains hidden files (like `.git`), Zola will alswo populate the site.

```bash
zola init myblog
# or
# populate the current directory
zola init
```

Any choices you make during the initialization can be changed later in the `config.toml` file.


### Theme Installation

#### By Git submodule

```bash
git submodule add https://github.com/edwardzcn-decade/cela themes/cela
git submodule update --init --force --recursive
git submodule sync
```

Then set the `theme` in your `config.toml` file.

```toml
theme = "cela"
```

#### By Download Releases

1. Download the latest release archive from the Cela releases.
2. Unzip to themes/cela in your Zola project.
3. Set `theme` in config.toml.
4. (Optional) Delete unused example content under content/ if you start fresh.

## Development

### Static Runtime Model

Cela stays a pure static Zola theme:

- No backend
- No frontend framework runtime
- No Node.js requirement for theme users

Node.js is used only for **theme development** to generate static CSS.

### CSS Layers

The CSS stack is split into three layers:

1. `static/css/theme-vars.css`: design tokens and theme variables
2. `static/css/theme-base.css` and `static/css/theme-common.css`: legacy baseline styles
3. `styles/tailwind.css` -> `static/css/theme-generated.css`: generated Tailwind layer for gradual migration

The generated CSS file is committed so downstream theme users still only need Zola.

### Local Theme Development

Install the development dependencies:

```bash
npm install
```

Build the generated CSS once:

```bash
npm run build:css
```

Watch CSS changes during theme development:

```bash
npm run watch:css
```

Validate and build the site:

```bash
zola check --skip-external-links
zola build
```

### Smoke Checklist

See [docs/smoke-checklist.md](docs/smoke-checklist.md) for the baseline routes and interactions to verify after template or CSS changes.

## LICENSE

MIT
