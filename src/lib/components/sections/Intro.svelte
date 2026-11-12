<script lang="ts">
	import { ChevronDown, ExternalLink, MapPin } from '@lucide/svelte';
	import * as m from '#lib/paraglide/messages.js';
	import Section from '#lib/components/ui/Section.svelte';
	import DenmarkDots from '#lib/components/ui/DenmarkDots.svelte';
</script>

<Section id="intro" title={m.intro_label()} class="mt-26">
	<div class="mt-auto -mb-6 grid items-end gap-12 sm:grid-cols-2">
		<div>
			<p class="text-sm leading-relaxed text-text">{m.intro_text()}</p>

			<a
				href="https://github.com/zelvios"
				target="_blank"
				rel="noopener noreferrer"
				class="group mt-4 flex items-center justify-between gap-3 border-t border-surface0 pt-4 text-sm transition-colors hover:text-accent"
			>
				<span>{m.intro_github()}</span>
				<span
					class="flex items-center gap-1.5 text-subtext0 transition-colors group-hover:text-accent"
				>
					github.com/zelvios
					<ExternalLink class="size-3.5" aria-hidden="true" />
				</span>
			</a>
			<p class="mt-12 flex items-center gap-1.5 text-sm text-subtext0">
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
