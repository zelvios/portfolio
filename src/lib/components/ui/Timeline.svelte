<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { ArrowRight, Calendar } from '@lucide/svelte';
	import { href } from '#lib/i18n.js';

	interface Entry {
		label: string;
		date: string;
		title: string;
		text: string;
		points?: string[];
		slug?: string;
	}

	let { entries, more }: { entries: Entry[]; more: string } = $props();
</script>

<ol class="pl-4 sm:pl-0">
	{#each entries as entry (entry.title)}
		<li class="sm:flex">
			<!-- left -->
			<div class="relative z-10 sm:w-1/4 sm:pb-10 sm:text-right">
				<div class="sm:sticky sm:top-20">
					<div class="pl-7 sm:pr-7 sm:pl-0">
						<span class="inline-block rounded-md bg-accent px-2 py-1 text-xs font-bold text-crust">
							{entry.label}
						</span>
					</div>
					<div
						class="mt-1 -ml-7 flex items-center gap-3 rounded-full bg-base px-3.5 py-2 sm:-mr-7 sm:ml-0"
					>
						<time class="order-2 grow text-xs text-subtext0 sm:order-1">{entry.date}</time>
						<span
							class="order-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-surface1 bg-mantle sm:order-2"
						>
							<Calendar class="size-3.5 text-subtext0" aria-hidden="true" />
						</span>
					</div>
				</div>
			</div>

			<!-- right -->
			<div class="relative pb-12 pl-8 sm:w-3/4 sm:pb-10 md:pl-12">
				<span aria-hidden="true" class="absolute -top-20 bottom-0 left-0 w-px bg-surface1 sm:top-0"
				></span>

				<h3 class="font-bold text-base text-text">{entry.title}</h3>
				<p class="mt-1 text-sm leading-snug text-subtext1">{entry.text}</p>

				{#if entry.points?.length}
					<ul
						class="mt-2 list-disc space-y-1 pl-5 text-sm leading-snug text-subtext1 marker:text-accent"
					>
						{#each entry.points as point (point)}
							<li>{point}</li>
						{/each}
					</ul>
				{/if}

				{#if entry.slug}
					<a
						href={resolve(href(`/work/${entry.slug}`) as Path)}
						class="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
					>
						{more}
						<ArrowRight class="size-3.5" aria-hidden="true" />
					</a>
				{/if}
			</div>
		</li>
	{/each}
</ol>
