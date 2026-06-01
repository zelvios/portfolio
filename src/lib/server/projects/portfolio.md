---
title: Personal Portfolio
description: A statically generated portfolio built with Svelte 5 runes and server-side data isolation.
createdAt: 2026-05-31
tags: [SvelteKit, Svelte 5, TypeScript, TailwindCSS, Motion-sv, Runed]
---

## Architecture Overview

This project is built with SvelteKit, focusing on fast load times and clean code separation. It relies on server-side
data loading and module isolation to keep the site's performance predictable and data secure.

## Svelte 5 & Runes

The site relies on Svelte 5's runes model to handle reactivity.
Using explicit states like `$state`, `$derived`, and `$props` makes it easier to manage UI interactions,
such as scroll tracking and theme swapping. This setup handles DOM updates efficiently and keeps the client-side
JavaScript bundle lightweight and type-safe.

## Server-Side Data Flow

To keep the frontend clean, all data fetching happens in `+page.server.ts` files. Heavy operations like parsing
Markdown files and normalizing dates run entirely within the `$lib/server` directory. This keeps file-system tools
and build-time dependencies out of the browser. The client only receives clean JSON data passed down through props,
which helps with both loading speeds and security.

## SEO & Discoverability

For search engine optimization, the site uses `<svelte:head>` to include the page description. Because the HTML
structure is generated during the build process, search crawlers can read this description and the complete page content
immediately without waiting for client-side JavaScript to execute.

To keep the routing consistent, every page uses a standard configuration:

`export const prerender = true`: Generates every page at build time.

`export const ssr = true`: Delivers fully rendered HTML on the initial request.

`export const trailingSlash = 'always'`: Standardizes the URL format to prevent duplicate content issues.

This setup eliminates the need for client-side JavaScript execution to determine page content, guaranteeing high
indexability and performance.

## The Static Advantage

The entire site is deployed as a static build using `@sveltejs/adapter-static`. Since a portfolio does not require a
live, persistent database, a static setup works best for a few reasons:

- **Performance:** Pre-rendering HTML, CSS, and JavaScript means a fast Time-To-First-Byte (TTFB). The browser fetches
  static files directly from a CDN instead of waiting for a server to process a request.
- **Simplified Infrastructure:** Eliminating a dynamic backend removes server maintenance and cold starts, making the
  site easier to host securely.
- **Build-Time Guarantees:** Setting `strict: true` in the adapter configuration means the SvelteKit compiler checks
  every internal route and asset link during the build. If there is a broken link or a typo in a project URL, the build
  fails immediately, preventing broken pages from ever going live.
