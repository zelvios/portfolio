<script lang="ts">
	import { ExternalLink, ChevronDown } from '@lucide/svelte';
	import * as m from '#lib/paraglide/messages.js';
	import sensecare1 from '#lib/assets/highlights/sensecare-1.png?enhanced';
	import sensecare2 from '#lib/assets/highlights/sensecare-2.png?enhanced';
	import sensecare3 from '#lib/assets/highlights/sensecare-3.png?enhanced';
	import portfolio1 from '#lib/assets/highlights/portfolio-1.png?enhanced';
	import portfolio2 from '#lib/assets/highlights/portfolio-2.png?enhanced';
	import Shot from '#lib/components/ui/Shot.svelte';

	const items = $derived([
		{
			title: m.hl_1_title(),
			text: m.hl_1_text(),
			tag: 'ESP32 · Rust · SvelteKit · PostgreSQL',
			repo: 'https://github.com/zelvios/sensecare',
			images: [{ src: sensecare1 }, { src: sensecare2 }, { src: sensecare3 }]
		},
		{
			title: m.hl_2_title(),
			text: m.hl_2_text(),
			tag: 'SvelteKit · adapter-static · Tailwind · Paraglide',
			repo: 'https://github.com/zelvios/portfolio',
			images: [{ src: portfolio1 }, { src: portfolio2, fit: 'contain' as const }]
		}
	]);

	const sequence = (title: string, text: string) => {
		const t = title.split(' ');
		const b = text.split(' ');
		const total = t.length + b.length;
		return {
			title: t.map((w, i) => ({ w, pos: i / total })),
			text: b.map((w, i) => ({ w, pos: (t.length + i) / total }))
		};
	};
</script>

<div data-reveal class="relative mt-4" style="height: calc({items.length} * 120dvh)">
	<div class="sticky top-20 flex h-[calc(100dvh-6rem)] flex-col justify-center gap-4 py-6">
		<div class="grid">
			{#each items as item, i (item.title)}
				{@const seq = sequence(item.title, item.text)}
				<div
					data-slide
					class="invisible col-start-1 row-start-1 flex flex-col pr-10 data-active:visible"
				>
					<span class="text-xs font-bold tracking-[0.2em] text-accent uppercase">0{i + 1}</span>
					<h3 class="mt-3 text-xl font-bold tracking-tight text-text sm:text-2xl">
						{#each seq.title as part, j (j)}
							<span class="word" style="--w: {part.pos}">{part.w + ' '}</span>
						{/each}
					</h3>
					<p class="mt-3 max-w-prose text-sm leading-relaxed text-text">
						{#each seq.text as part, j (j)}
							<span class="word" style="--w: {part.pos}">{part.w + ' '}</span>
						{/each}
					</p>
					<div
						class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-subtext0"
					>
						<span>{item.tag}</span>
						<a
							href={item.repo}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 rounded-md border border-surface1 bg-mantle px-2.5 py-1 font-bold text-text transition-colors hover:border-accent hover:text-accent"
						>
							<ExternalLink class="size-3.5" aria-hidden="true" />
							GitHub
						</a>
					</div>
				</div>
			{/each}
		</div>

		<!-- figure -->
		<div class="relative aspect-[4/3] max-h-[50dvh] w-full">
			{#each items as item, i (item.title)}
				<figure
					data-figure
					data-carousel
					class="pointer-events-none absolute inset-0 flex gap-4 opacity-0 transition-opacity duration-500 data-active:pointer-events-auto data-active:opacity-100"
					style="--n: {item.images.length}"
				>
					<!-- images -->
					<div class="flex min-w-0 flex-1 flex-col gap-3">
						<div
							class="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-surface0 bg-mantle"
						>
							{#each item.images as image, k (k)}
								{@const id = `shot-${i}-${k}`}
								<div
									data-shot
									class="pointer-events-none absolute inset-0 flex items-center justify-center bg-mantle opacity-0 transition-opacity duration-500 data-current:pointer-events-auto data-current:opacity-100"
								>
									{#if image}
										<button
											type="button"
											popovertarget={id}
											aria-label={m.hl_zoom()}
											class="h-full w-full cursor-zoom-in"
										>
											<Shot src={image.src} fit={image.fit} alt="{item.title} {k + 1}" />
										</button>

										<div
											{id}
											popover
											data-lightbox
											class="m-auto max-h-[90dvh] max-w-[90vw] rounded-lg border border-surface0 bg-crust p-2 backdrop:bg-crust/80 backdrop:backdrop-blur-sm"
										>
											<button
												type="button"
												popovertarget={id}
												popovertargetaction="hide"
												aria-label={m.hl_close()}
												class="block cursor-zoom-out"
											>
												<Shot
													src={image.src}
													sizes="90vw"
													alt="{item.title} {k + 1}"
													class="max-h-[calc(90dvh-1rem)]"
												/>
											</button>
										</div>
									{:else}
										<span class="text-xs text-subtext0">[image {k + 1}]</span>
									{/if}
								</div>
							{/each}
						</div>

						<p class="flex items-center gap-1.5 text-xs text-subtext0">
							<ChevronDown class="size-3.5 motion-safe:animate-bounce" aria-hidden="true" />
							{m.hl_scroll_hint()}
						</p>
					</div>

					<!-- vertical progress bars -->
					<div class="flex flex-col justify-center gap-2">
						{#each item.images.keys() as k (k)}
							<button
								type="button"
								data-goto={k}
								aria-label={m.hl_image({ n: k + 1 })}
								class="group/bar flex h-16 w-6 cursor-pointer justify-center"
							>
								<span
									class="h-full w-1 overflow-hidden rounded-full bg-surface1 transition-colors group-hover/bar:bg-surface2"
								>
									<span class="bar block h-full w-full origin-top bg-accent" style="--k: {k}"
									></span>
								</span>
							</button>
						{/each}
					</div>
				</figure>
			{/each}
		</div>
	</div>
</div>

<style>
	.word {
		opacity: clamp(0.25, calc((var(--p, 0) - var(--w)) * 6 + 1), 1);
	}

	.bar {
		scale: 1 clamp(0, calc((var(--p, 0) - var(--k) / var(--n)) * var(--n)), 1);
	}

	@media (prefers-reduced-motion: reduce) {
		.word {
			opacity: 1;
		}
		.bar {
			scale: 1;
		}
	}
</style>
