---
title: Personal Portfolio
description: A statically generated portfolio built with Svelte 5 runes and server-side data isolation.
createdAt: 2026-05-31
tags: [SvelteKit, Svelte 5, TypeScript, TailwindCSS, Motion-sv, Runed]
---

## Architecture Overview

This website is engineered for performance and maintainability. Built with SvelteKit, the site leverages server-side
data loading and strict module isolation to ensure efficient, secure, and predictable performance.

## Svelte 5 & Runes

By opting into Svelte 5’s runes model, the codebase utilizes an explicit and granular reactivity system. Through the use
of `$state`, `$derived`, and `$props`, we manage complex UI interactions—such as scroll tracking and theme
swapping with high precision. This architecture optimizes DOM updates and ensures the client-side bundle remains
lightweight and strictly type-safe.

## Server-Side Data Flow

The site enforces a strict separation of concerns by utilizing `+page.server.ts` files for all data fetching. By
centralizing logic such as Markdown parsing and date normalization within the `$lib/server` directory, we ensure
that
sensitive file-system operations and heavy build-time dependencies are never exposed to the client. This approach
guarantees that only the necessary, sanitized JSON data is passed to the components via Svelte 5 props, enhancing both
security and runtime efficiency.

## SEO & Discoverability

The site utilizes dynamic `<svelte:head>` injection to ensure a clean, semantic document structure for search engine
indexing. By generating structured page titles and content hierarchies during the static build process, the site ensures
that crawlers parse the complete DOM immediately.

To maintain consistent, SEO-friendly routing, the site enforces a standardized configuration across all pages:

`export const prerender = true`: Ensures all pages are generated at build time for maximum availability.

`export const ssr = true`: Provides fully rendered HTML on the initial request, optimizing indexing.

`export const trailingSlash = 'always'`: Standardizes URL structure to avoid duplicate content issues.

This setup eliminates the need for client-side JavaScript execution to determine page content, guaranteeing high
indexability and performance.

## The Static Advantage

The infrastructure relies entirely on \`@sveltejs/adapter-static\`.
A completely static build was chosen over a traditional dynamic backend because the site’s content model does not
require a persistent database, allowing for a more efficient architecture:

- **Performance:** Pre-rendering HTML, CSS, and JS results in a near-instant Time-To-First-Byte (TTFB). The
  browser simply downloads files from a CDN without waiting for a server to compute the page.
- **Simplified Infrastructure:** Serving static files eliminates backend server dependencies, removing cold starts and
  making it trivial to host securely anywhere.
- **Build-Time Guarantees:** By utilizing \`strict: true\` in the adapter configuration, the SvelteKit compiler
  guarantees that every internal route, tag, and asset link is validated during the build process. If a link breaks or a
  project slug is misspelled, the build fails immediately, ensuring users are never shipped a broken route.`,
