<script lang="ts">
	import Callout from '#lib/components/ui/Callout.svelte';
</script>

<h2>Setup</h2>
<p>
	This site is built with SvelteKit and prerendered to static files. There is no server, no database
	and no UI component library.
</p>

<dl>
	<dt>Framework</dt>
	<dd>SvelteKit 3, Svelte 5, adapter-static</dd>
	<dt>Styling</dt>
	<dd>Tailwind CSS 4, JetBrains Mono (self-hosted), Vesper palette</dd>
	<dt>Languages</dt>
	<dd>English and Danish with Paraglide</dd>
	<dt>Hosting</dt>
	<dd>Cloudflare Pages</dd>
</dl>

<h2>No client-side framework</h2>
<p>
	All routes are rendered to HTML at build time and
	<strong>client-side rendering is turned off</strong>. The browser receives HTML and CSS, not the
	Svelte runtime.
</p>

<pre><code
		>{`// src/routes/+layout.ts
export const prerender = true;
export const csr = false;`}</code
	></pre>

<p>
	The theme switch, the sticky header, the scroll effects and the image lightbox are handled by one
	inline script in <code>app.html</code>. The script only changes attributes and CSS variables on
	the page. The visuals and animations themselves are done in CSS.
</p>

<h2>Scroll-driven text</h2>
<p>
	On the front page, the highlight text lights up word by word while scrolling. The script writes
	the scroll progress to <code>--p</code>, and each word has its own position in <code>--w</code>.
</p>

<pre><code
		>{`.word {
    opacity: clamp(0.25, calc((var(--p) - var(--w)) * 6 + 1), 1);
}`}</code
	></pre>

<h2>Fonts and images</h2>
<ul>
	<li>
		The font files contain only Latin and Danish characters, which cuts each one from 93 KB to 40
		KB.
	</li>
	<li>
		Screenshots are generated as AVIF and WebP in three widths, so a phone downloads a smaller file
		than a desktop. They are below the first screen, so they load lazily: the browser fetches them
		when the visitor scrolls near them, not on page load.
	</li>
	<li>
		The mobile menu and the lightbox use the <strong>HTML Popover API</strong> instead of a script.
	</li>
</ul>

<h2>Search and sharing</h2>
<p>
	Each page sets its own title, description and <strong>Open Graph</strong> tags through one
	component. The layout adds the canonical URL and <code>hreflang</code> links, so search engines treat
	the English and Danish versions as the same page in two languages.
</p>
<ul>
	<li>
		<code>sitemap.xml</code> is a prerendered route that lists every page in both languages. New
		entries under <strong>/work</strong> are added automatically.
	</li>
	<li>
		The front page includes <strong>JSON-LD</strong> describing a <code>Person</code> and a
		<code>WebSite</code>.
	</li>
	<li>A 1200 x 630 image is used as the preview when a link is shared.</li>
</ul>

<h2>Workflow</h2>
<p>
	<strong>Conventional Commits</strong>, one branch per change, pull requests into
	<code>main</code>.
	<code>pnpm verify</code> runs formatting, linting, the build and type checking.
</p>

<Callout type="note">
	The prerenderer follows every internal link. A link to a missing page fails the build.
</Callout>
