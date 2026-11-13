<script lang="ts">
	import Callout from '#lib/components/ui/Callout.svelte';
</script>

<h2>Final examination project</h2>
<p>
	<strong>SenseCare</strong> was my final examination project (svendeprøve) for the Danish vocational
	education Datatekniker with a specialisation in programming. It is an IoT platform for monitoring indoor
	climate and handling service calls in hospital rooms.
</p>

<dl>
	<dt>Type</dt>
	<dd>Final examination project (svendeprøve)</dd>
	<dt>Education</dt>
	<dd>Datatekniker with a specialisation in programming (vocational education)</dd>
	<dt>Grade</dt>
	<dd>12 on the Danish 7-point scale (equivalent to A)</dd>
	<dt>Stack</dt>
	<dd>ESP32, Rust (axum, Diesel), SvelteKit, PostgreSQL, Docker Compose</dd>
</dl>

<p>
	ESP32 nodes in each room report readings and service calls to a Rust API, which stores them in
	PostgreSQL. A SvelteKit dashboard shows staff the state of every room.
</p>

<Callout type="note">
	This page will be expanded with a closer look at the architecture, the decisions behind it and
	what I learned.
</Callout>
