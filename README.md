[logo]: https://github.com/oierbravo/pleasure/raw/master/src/assets/images/logo.png "Pleasure"

# Pleasure Static Site Generator

> Twig-based static site generator powered by Gulp.

## Motivation

There are many static site generators, but we often end up tweaking and adjusting them. This project is a boilerplate for basic static sites, tailored to our workflows, and intended to work out of the box with minimal configuration. Heavily inspired by Jekyll.

## Requirements

Use **Node.js 18 or later** (current LTS recommended). The build no longer relies on native `node-sass`; dependencies use **Dart Sass** (`sass`) via `npm overrides`, which works on modern Node versions.

If you use nvm: `nvm install` / `nvm use` (see `.nvmrc` in the repository root).

## Prerequisites

- ### Node.js

  - 18+ — [https://nodejs.org](https://nodejs.org) (standard installation)

## Download (upstream boilerplate)

- Archive: [https://github.com/oierbravo/pleasure/archive/0.3.zip](https://github.com/oierbravo/pleasure/archive/0.3.zip)
- Prefer the latest upstream `release` when evaluating the base generator.

## Installation

```bash
npm install
```

`postinstall` runs **patch-package** (applies patches under `patches/`). `prepare` installs **Husky** Git hooks.

## Development

```bash
npm start
```

Runs Gulp and the development workflow (BrowserSync, `build-dev` output; default port is configured in `gulp-tasks-pleasure`, typically **3005**).

## Production build

Clean previous production output:

```bash
npm run clear
```

Full production build:

```bash
npm run build
```

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) and are checked by **Commitlint** on `git commit` (Husky `commit-msg` hook). To skip hooks for a one-off commit (not recommended): `HUSKY=0 git commit ...`.

## BMad change workflow (Cursor / email / Word)

This repository includes **BMad** skills under `_bmad/core/` to structure change requests (for example copy or sections driven by an email or a `.docx`). There is no separate daemon: you ask the Cursor agent to follow the skill by name (or attach the skill from your rules).

**Order of skills**

1. **`bmad-change-request`** — Creates `_bmad-output/requests/<correlationId>/` from `_bmad-output/requests/_template/`, puts raw artefacts in `source/`, fills `manifest.yaml`. Does **not** edit `src/`. Optional: extract text from `.docx` with `_bmad/core/bmad-change-request/scripts/extract_docx_text.py`.
2. **`bmad-change-discovery`** — Reads `manifest` and `source/`, explores the repo, fills `discovery.md` (scope, candidate files, open questions). No patches or commits.
3. **`bmad-change-proposal`** — Writes drafts under `proposal/` for human review; **no commit** until you approve. When the cycle closes, append a line to `_bmad-output/agent-lessons-learned.md`.

**Implementing in the product** happens after you accept the proposal: apply edits to `src/` (and rebuild) as usual.

**Invocation:** In chat, something like: “Run the `bmad-change-request` skill” and attach the `.eml` / file path or paste the text. Then chain `bmad-change-discovery` and `bmad-change-proposal` with the same `correlationId`.

**Git:** `_bmad-output/requests/*/source/` is ignored (raw mail/adjuntos). Other files under `_bmad-output/` can be committed for traceability.

**Orientation:** `bmad-help` suggests the next step from your current artefacts.

## Structure

> A mix of simple layout and more advanced pieces.

### Folders

```
|-- build/                 (generated production build)
|-- build-dev/             (generated development build)
|-- src/assets/fonts/      (font sources)
|-- src/assets/images/     (image sources)
|-- src/assets/js/         (JavaScript sources)
|-- src/assets/scss/       (SMACSS-style Sass)
|-- src/assets/svg/        (SVG sources)
|-- src/assets/videos/     (video sources)
|-- gulpfile.js            (Gulp entry)
|-- node_modules/          (npm dependencies)
|-- package.json
|-- config.vendors.js      (example vendor JS configuration)
|-- patches/               (patch-package patches for gulp-tasks-pleasure)
|-- README.md
```

### Sass

BEM and atomic-style structure:

```
src/assets/scss/
  |-- 01_tools/
  |-- 02_settings/
  |-- 03_generic/
  |-- 04_elements/
  |-- 05_objects/
  |-- 06_components/
  |-- 07_pages/
  |-- 08_utilities/
  |-- styles.scss
```

### Pages

```
src/pages/
  |-- _components/     (reusable Twig components)
  |-- _data/           (site and page data)
  |-- _includes/       (shared includes)
  |-- _layouts/        (HTML / page layouts)
  |-- page1/index.twig (example page)
  |-- page2/index.twig (example page with partials)
  |-- dev-guide.twig   (dev index: pages, components, SVG)
  |-- index.twig
```

### SVG sprite sheet

(See Gulp / `gulp-tasks-pleasure` tasks for generation.)

## Nuts and bolts

> How the pieces fit together.

- ### Favicon
- ### JS vendors (`config.vendors.js`)
- ### Sass vendors
- ### Critical CSS splitting
- ### Fonts
- ### Image optimization, responsive images, and lazy loading
- ### SVG icon sprite sheet
- ### Defaults
- ### GDPR / consent

## Patches

`gulp-tasks-pleasure` is patched via **patch-package** (see `patches/gulp-tasks-pleasure+0.0.6.patch`), mainly for inject paths, the dev guide page list, and compatibility with the current Gulp / Sass setup.

## Dependency upgrades (known limits)

- **`package-lock.json`** is committed so installs match the same resolved tree across machines.
- **`overrides`** in `package.json`: (1) `gulp-sass` 5.x and `node-sass` → Dart `sass`; (2) security pins that were tested with `npm run build` — `axios`, `underscore`, `locutus`, and `@xmldom/xmldom@0.8.12` (use **0.8.x**, not **0.9.x**, or `gulp-svg-sprite` / `svg-sprite` can fail at the SVG task). Broader overrides (e.g. `postcss`, `svgo`) were reverted because they broke **images** or **svg** pipelines.
- **Patch** [`patches/gulp-tasks-pleasure+0.0.6.patch`](patches/gulp-tasks-pleasure+0.0.6.patch) also **drops the `gulp-sass-lint` dependency** from `gulp-tasks-pleasure` so the old `sass-lint` / `eslint` subtree is not installed (no project `.sass-lint` config; lint was unused).
- **Gulp** stays on the **4.x** line (latest `4.0.2`). **Gulp 5** is not adopted yet because `gulp-tasks-pleasure@0.0.6` and its plugin stack would need a dedicated compatibility pass (and a newer upstream or fork) before switching.
- **`gulp-tasks-pleasure`** remains at **0.0.6** (newer npm versions exist but would require re-testing and likely updating the patch file).
- **`include-media`** stays on **1.x**; **2.x** is a separate major and would need a Sass usage review.
- **`npm audit`**: expect remaining findings (for example **gulp-build** / Handlebars / old **uglify-js**, **BrowserSync** / **serve-static**, **chokidar** / **braces** under Gulp 4). Do **not** use `npm audit fix --force` blindly — npm may downgrade `gulp-tasks-pleasure` and break the project. Track leftovers as backlog or context-specific risk (local dev build, not a public server).
- **Build warnings**: Sass still emits deprecation notices for **`@import`** and legacy patterns inside Bootstrap 4, **typi**, and **modularscale-sass**; clearing those means a later migration to **`@use` / `@forward`** (and possibly Bootstrap 5), which is out of scope for patch-only upgrades. You may also see **`legacy-js-api`** from the Sass compiler API used via `gulp-sass`, and occasional **Node** deprecation notices (for example `fs.Stats`) from older dependencies.

## To do

- Critical split refinements
- Responsive images
- Documentation
- Default non-intrusive HTML and Sass
- Favicon generation

## Netlify

Internal deployments: contact **it-sistemas@selfbank.es** for access. **Do not store passwords or secrets in this repository**; use the Netlify dashboard or your team’s secret manager.
