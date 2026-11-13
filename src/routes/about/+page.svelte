<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import Seo from '#lib/components/ui/Seo.svelte';
</script>

<Seo title={m.about_meta_title()} description={m.about_description()} />

<h1 class="text-4xl font-extrabold">{m.about_title()}</h1>
<p class="mt-3 text-subtext0">{m.about_description()}</p>
