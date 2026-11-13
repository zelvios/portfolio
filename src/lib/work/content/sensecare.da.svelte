<script lang="ts">
	import Callout from '#lib/components/ui/Callout.svelte';
</script>

<h2>Afsluttende eksamensprojekt</h2>
<p>
	<strong>SenseCare</strong> var mit afsluttende eksamensprojekt (svendeprøve) på erhvervsuddannelsen
	til datatekniker med speciale i programmering. Det er en IoT-platform til overvågning af indeklima og
	håndtering af serviceopkald på hospitalsstuer.
</p>

<dl>
	<dt>Type</dt>
	<dd>Afsluttende eksamensprojekt</dd>
	<dt>Uddannelse</dt>
	<dd>Data- og kommunikationsuddannelsen, Datatekniker med speciale i programmering</dd>
	<dt>Karakter</dt>
	<dd>12 på den danske 7-trinsskala (svarende til A)</dd>
	<dt>Teknologier</dt>
	<dd>ESP32, Rust (axum, Diesel), SvelteKit, PostgreSQL, Docker Compose</dd>
</dl>

<p>
	ESP32-enheder i hvert rum som sender målinger og serviceopkald til et Rust-API, der gemmer dem i
	PostgreSQL. Et SvelteKit-dashboard giver personalet et overblik over tilstanden i hvert enkelt
	rum.
</p>

<Callout type="note">
	Denne side vil blive udvidet med et nærmere kig på arkitekturen, beslutningerne bag den og hvad
	jeg har lært.
</Callout>
