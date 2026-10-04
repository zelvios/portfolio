<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.about_meta_title()}</title>
	<meta name="description" content={m.about_description()} />
</svelte:head>

<h1 class="text-4xl font-extrabold">{m.about_title()}</h1>
<p class="mt-3 text-subtext0">{m.about_description()}</p>
