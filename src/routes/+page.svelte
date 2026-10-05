<script lang="ts">
	import Hero from '#lib/components/sections/Hero.svelte';
	import Header from '#lib/components/layout/Header.svelte';
</script>

<Hero />
<div data-sticky-sentinel class="mt-16 h-px"></div>
<Header hero />

<!-- TEMP: scroll room for testing the sticky header -->
<div class="h-[200vh]"></div>
