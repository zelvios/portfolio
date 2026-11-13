<script lang="ts">
	import Callout from '#lib/components/ui/Callout.svelte';
</script>

<h2>Opsætning</h2>
<p>
	Siden er bygget med SvelteKit og prerenderet til statiske filer. Der er ingen server, ingen
	database og intet UI komponentbibliotek.
</p>

<dl>
	<dt>Framework</dt>
	<dd>SvelteKit 3, Svelte 5, adapter-static</dd>
	<dt>Styling</dt>
	<dd>Tailwind CSS 4, JetBrains Mono (selvhostet), Vesper-palette</dd>
	<dt>Sprog</dt>
	<dd>Engelsk og dansk med Paraglide</dd>
	<dt>Hosting</dt>
	<dd>Cloudflare Pages</dd>
</dl>

<h2>Intet framework i browseren</h2>
<p>
	Alle ruter bliver renderet til HTML, når siden bygges, og
	<strong>client-side rendering er slået fra</strong>. Browseren modtager HTML og CSS, ikke
	Svelte-runtimen.
</p>

<pre><code
		>{`// src/routes/+layout.ts
export const prerender = true;
export const csr = false;`}</code
	></pre>

<p>
	Temaskift, den fastgjorte header, scroll-effekterne og billedvisningen håndteres af ét inline
	script i <code>app.html</code>. Scriptet ændrer kun attributter og CSS-variabler på siden. Selve
	udseendet og animationerne styres af CSS.
</p>

<h2>Scroll-styret tekst</h2>
<p>
	På forsiden lyser teksten i højdepunkterne op ord for ord, mens man scroller. Scriptet skriver
	scroll-fremdriften til <code>--p</code>, og hvert ord har sin egen position i <code>--w</code>.
</p>

<pre><code
		>{`.word {
    opacity: clamp(0.25, calc((var(--p) - var(--w)) * 6 + 1), 1);
}`}</code
	></pre>

<h2>Skrifttyper og billeder</h2>
<ul>
	<li>
		Skrifttypefilerne indeholder kun latinske og danske tegn, hvilket reducerer hver fil fra 93 KB
		til 40 KB.
	</li>
	<li>
		Skærmbilleder genereres som AVIF og WebP i tre bredder, så en telefon henter en mindre fil end
		en computer. De ligger under den første skærm og indlæses derfor først, når den besøgende
		scroller hen i nærheden af dem, og ikke når siden åbnes.
	</li>
	<li>
		Mobilmenuen og billedvisningen bruger <strong>HTML Popover API</strong> i stedet for et script.
	</li>
</ul>

<h2>Søgning og deling</h2>
<p>
	Hver side sætter sin egen titel, beskrivelse og sine egne <strong>Open Graph</strong> tags gennem
	ét komponent. Layoutet tilføjer sidens officielle adresse (canonical) og
	<code>hreflang</code>-links, så søgemaskiner opfatter den engelske og den danske version som samme
	side på to sprog.
</p>
<ul>
	<li>
		<code>sitemap.xml</code> er en prerenderet rute, der lister alle sider på begge sprog. Nye
		indlæg under <strong>/work</strong> bliver tilføjet automatisk.
	</li>
	<li>
		Forsiden indeholder <strong>JSON-LD</strong>, der beskriver en <code>Person</code> og et
		<code>WebSite</code>.
	</li>
	<li>Et billede på 1200 x 630 bruges som forhåndsvisning, når et link deles.</li>
</ul>

<h2>Arbejdsgang</h2>
<p>
	<strong>Conventional Commits</strong>, én branch pr. ændring og pull requests ind i
	<code>main</code>. <code>pnpm verify</code> kører formatering, linting, build og typetjek.
</p>

<Callout type="note">
	Prerendereren følger alle interne links. Et link til en side, der ikke findes, får buildet til at
	fejle.
</Callout>
