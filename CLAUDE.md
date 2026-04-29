# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR (Vite)
npm run build     # Production build → dist/
npm run preview   # Serve production build locally
```

No test runner or linter is configured.

## What This Is

A personal portfolio website. Visitors scroll through 3D models representing projects, filter by category, and click into project detail pages. Built with Svelte 5 + Vite + Three.js.

## Architecture

```
src/
  main.js                          — entry point, mounts App.svelte to #app
  App.svelte                       — layout shell; state-based routing (gallery ↔ detail)
  app.css                          — global styles, CSS custom properties, grid layout, dark mode
  lib/
    data/
      projects.js                  — project data array (id, title, description, categories, geometryType, color)
    components/
      Gallery.svelte               — Three.js angled carousel; handles scroll/swipe/keyboard/click
      Sidebar.svelte               — category filter toggles (Technical, Design, Art)
      BottomBar.svelte             — footer links (Resume, Contact, GitHub, LinkedIn)
      ThemeToggle.svelte           — sun/moon light/dark toggle; persists to localStorage
      ProjectDetail.svelte         — project detail template (placeholder, design TBD)
```

## Layout

CSS Grid with `grid-template-columns: 200px 1fr`. Sidebar on the left, main content area on the right, bottom bar spanning full width. On mobile (≤768px) flips to single column: filter pills at top, canvas in middle, footer at bottom.

## 3D Gallery

Models are arranged along a ~35° diagonal axis in the Three.js scene so the next 1-2 models are visible receding into the distance. The camera lerps smoothly to the target position. Navigation: scroll wheel (desktop), swipe (mobile), arrow keys. Clicking the centered model opens its detail page; clicking a non-centered model scrolls to it.

No `.glb`/`.gltf` model files yet — placeholder Three.js geometries are used (icosahedron, torus, torusKnot, etc.) and will be swapped for real models later.

## Dark Mode

`ThemeToggle.svelte` sets `document.documentElement.dataset.theme`. CSS uses both `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]` — the attribute takes precedence when set, allowing the toggle to override system preference.

## Key Conventions

- **Svelte 5 runes**: Use `$state`, `$derived`, `$effect` (not legacy stores)
- **Type checking**: JavaScript files are type-checked via `jsconfig.json` (`checkJs: true`, `verbatimModuleSyntax: true`) — keep imports compatible
- **Three.js cleanup**: Always dispose geometries, materials, and the renderer in the `onMount` return function or `onDestroy`. Event listeners added in `onMount` must be removed in the cleanup.
- **Filter safety**: At least one category filter must stay active — `toggleFilter` in `App.svelte` enforces this. When the filtered project list shrinks, `currentIndex` is clamped in Gallery's `$effect`.
- **Adding projects**: Edit `src/lib/data/projects.js`. Each entry needs `id`, `title`, `description`, `categories` (array of `'Technical'`/`'Design'`/`'Art'`), `geometryType` (Three.js primitive name), and `color` (hex number).
