<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.projects_meta_title()}</title>
	<meta name="description" content={m.projects_description()} />
</svelte:head>

<h1 class="text-4xl font-extrabold">{m.projects_title()}</h1>
<p class="mt-3 text-subtext0">{m.projects_description()}</p>
