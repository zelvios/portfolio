<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { MapPin } from '@lucide/svelte';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import Section from '#lib/components/ui/Section.svelte';
	import DenmarkDots from '#lib/components/ui/DenmarkDots.svelte';

	const stack = ['Rust', 'C#', 'TypeScript', 'Svelte', 'Docker', 'PostgreSQL'];
</script>

<Section id="intro" index="01" title={m.intro_label()} class="mt-26">
	<div class="grid items-center gap-12 sm:grid-cols-2">
		<div>
			<p class="text-lg leading-snug font-bold tracking-tight sm:text-xl">
				{m.intro_pre()}
				<a href={resolve(href('/about') as Path)} class="text-accent hover:underline"
					>{m.intro_link()}</a
				>{m.intro_post()}
			</p>
			<ul
				class="mt-6 flex flex-wrap gap-2 text-xs text-subtext0"
				aria-label={m.intro_stack_label()}
			>
				{#each stack as item (item)}
					<li class="rounded border border-surface0 bg-mantle px-2 py-1">{item}</li>
				{/each}
			</ul>
		</div>

		<figure class="flex flex-col items-center gap-4 justify-self-center sm:justify-self-end">
			<DenmarkDots class="w-56 text-subtext0 sm:w-64" />
			<figcaption
				class="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-subtext0 uppercase"
			>
				<MapPin class="size-3.5 text-accent" aria-hidden="true" />
				{m.intro_from()}
			</figcaption>
		</figure>
	</div>
</Section>
