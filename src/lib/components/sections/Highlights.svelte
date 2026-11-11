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
			name: 'SenseCare',
			title: m.hl_1_title(),
			text: m.hl_1_text(),
			tag: 'ESP32 · Rust · SvelteKit · PostgreSQL',
			repo: 'https://github.com/zelvios/sensecare',
			images: [{ src: sensecare1 }, { src: sensecare2 }, { src: sensecare3 }]
		},
		{
			name: 'jacob-j.com',
			title: m.hl_2_title(),
			text: m.hl_2_text(),
			tag: 'SvelteKit · adapter-static · Tailwind · Paraglide',
			repo: 'https://github.com/zelvios/portfolio',
			images: [{ src: portfolio1 }, { src: portfolio2, fit: 'contain' as const }]
		}
	]);

	const sequence = (name: string, title: string, text: string) => {
		const parts = [name.split(' '), title.split(' '), text.split(' ')];
		const total = parts.flat().length;
		let n = 0;
		const [nameWords, titleWords, textWords] = parts.map((words) =>
			words.map((w) => ({ w, pos: n++ / total }))
		);
		return { name: nameWords, title: titleWords, text: textWords };
	};
</script>

<div data-reveal class="relative mt-4" style="height: calc({items.length} * 120dvh)">
	<div class="sticky top-20 flex h-[calc(100dvh-6rem)] flex-col justify-center gap-4 py-6">
		<div class="grid">
			{#each items as item (item.title)}
				{@const seq = sequence(item.name, item.title, item.text)}
				<div data-slide class="invisible col-start-1 row-start-1 flex flex-col data-active:visible">
					<h3 class="text-xl font-bold tracking-tight text-accent sm:text-2xl">
						{#each seq.name as part, j (j)}
							<span class="word" style="--w: {part.pos}">{part.w + ' '}</span>
						{/each}
					</h3>
					<p class="mt-1 text-text sm:text-lg">
						{#each seq.title as part, j (j)}
							<span class="word" style="--w: {part.pos}">{part.w + ' '}</span>
						{/each}
					</p>
					<span class="mt-4 block h-px w-full bg-surface0" aria-hidden="true"></span>
					<p class="mt-4 max-w-[85ch] text-sm leading-relaxed text-text">
						{#each seq.text as part, j (j)}
							<span class="word" style="--w: {part.pos}">{part.w + ' '}</span>
						{/each}
					</p>
					<div
						class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-subtext0"
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
					class="pointer-events-none absolute inset-0 flex flex-col gap-3 opacity-0 transition-opacity duration-500 data-active:pointer-events-auto data-active:opacity-100"
					style="--n: {item.images.length}"
				>
					<!-- images -->
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

					<!-- under the image: scroll hint and progress bars -->
					<div class="flex items-center justify-between gap-4">
						<p class="flex items-center gap-1.5 text-xs text-subtext0">
							<ChevronDown class="size-3.5 motion-safe:animate-bounce" aria-hidden="true" />
							{m.hl_scroll_hint()}
						</p>

						<div class="flex items-center gap-3">
							<span class="text-xs text-subtext0">{m.hl_images()}</span>
							<div class="flex gap-2">
								{#each item.images.keys() as k (k)}
									<button
										type="button"
										data-goto={k}
										aria-label={m.hl_image({ n: k + 1 })}
										class="group/bar flex h-6 w-12 cursor-pointer items-center"
									>
										<span
											class="h-1 w-full overflow-hidden rounded-full bg-surface1 transition-colors group-hover/bar:bg-surface2"
										>
											<span class="bar block h-full w-full origin-left bg-accent" style="--k: {k}"
											></span>
										</span>
									</button>
								{/each}
							</div>
						</div>
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
		scale: clamp(0, calc((var(--p, 0) - var(--k) / var(--n)) * var(--n)), 1) 1;
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
