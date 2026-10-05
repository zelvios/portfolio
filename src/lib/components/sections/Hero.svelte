<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import DotPattern from '#lib/components/ui/DotPattern.svelte';
</script>

<section class="relative pt-[22dvh] text-center sm:pt-[26dvh]">
	<div class="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[75dvh]">
		<DotPattern class="mask-[radial-gradient(460px_circle_at_50%_55%,black,transparent)]" />
	</div>

	<h1
		class="mb-[-0.15em] bg-linear-to-br from-text via-text to-accent bg-clip-text pb-[0.15em] text-5xl leading-[0.95] font-extrabold tracking-tighter text-transparent sm:text-7xl md:text-8xl"
	>
		Jacob Jørgensen
	</h1>
	<p class="mt-6 text-lg text-subtext0 sm:text-xl">{m.hero_role()}</p>
</section>
