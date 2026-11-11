<script lang="ts">
	import { ChevronDown, MapPin } from '@lucide/svelte';
	import * as m from '#lib/paraglide/messages.js';
	import Section from '#lib/components/ui/Section.svelte';
	import DenmarkDots from '#lib/components/ui/DenmarkDots.svelte';
</script>

<Section id="intro" title={m.intro_label()} class="mt-26">
	<div class="grid items-center gap-12 sm:grid-cols-2">
		<div>
			<ul class="divide-y divide-surface0 text-sm text-text">
				<li class="py-3 first:pt-0">{m.intro_fact_1()}</li>
				<li class="py-3">{m.intro_fact_2()}</li>
				<li class="py-3">{m.intro_fact_3()}</li>
				<li class="py-3">{m.intro_fact_4()}</li>
			</ul>
			<p class="mt-5 flex items-center gap-1.5 text-sm text-subtext0">
				<ChevronDown class="size-4 text-accent motion-safe:animate-bounce" aria-hidden="true" />
				{m.intro_more()}
			</p>
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
