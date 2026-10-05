<script lang="ts">
	import Hero from '#lib/components/sections/Hero.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import Intro from '#lib/components/sections/Intro.svelte';
	import Work from '#lib/components/sections/Work.svelte';
</script>

<Hero />
<div data-sticky-sentinel class="mt-16 h-px"></div>
<Header hero />
<Intro />
<Work />

<!-- TEMP: scroll room for testing the sticky header -->
<div class="h-[200vh]"></div>
