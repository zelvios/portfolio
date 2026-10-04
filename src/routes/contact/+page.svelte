<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.contact_meta_title()}</title>
	<meta name="description" content={m.contact_description()} />
</svelte:head>

<h1 class="text-4xl font-extrabold">{m.contact_title()}</h1>
<p class="mt-3 text-subtext0">{m.contact_description()}</p>
