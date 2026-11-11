<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { ArrowRight } from '@lucide/svelte';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import GridFrame from '#lib/components/ui/GridFrame.svelte';
	import GridCell from '#lib/components/ui/GridCell.svelte';
	import BrowserFrame from '#lib/components/ui/BrowserFrame.svelte';
	import GitFlow from '#lib/components/ui/GitFlow.svelte';
	import Highlights from '#lib/components/sections/Highlights.svelte';
</script>

{#snippet label(text: string)}
	<h2 class="flex items-center gap-2.5 text-sm font-bold text-accent">
		<span class="h-px w-2 bg-accent" aria-hidden="true"></span>
		{text}
	</h2>
{/snippet}

<section id="work" class="mt-48">
	<GridFrame cols="sm:grid-cols-[1fr_2fr]">
		<GridCell>
			{@render label(m.work_values_label())}
			<ul class="my-auto divide-y divide-surface0 text-sm text-text">
				<li class="py-2.5 first:pt-0">{m.work_values_1()}</li>
				<li class="py-2.5 first:pt-0">{m.work_values_2()}</li>
				<li class="py-2.5 last:pb-0">{m.work_values_3()}</li>
			</ul>
		</GridCell>

		<GridCell>
			{@render label(m.work_method_label())}
			<BrowserFrame
				class="mt-4"
				url="github.com/zelvios/sensecare"
				href="https://github.com/zelvios/sensecare"
			>
				<GitFlow />

				<dl
					class="mt-6 flex flex-wrap items-start gap-x-12 gap-y-4 border-t border-surface0 pt-5 text-xs"
				>
					<div>
						<dt class="text-subtext0">
							{m.work_process_label()}
						</dt>
						<dd class="mt-1.5 text-text">Agile - Scrum - Kanban - Issues - Pull requests</dd>
					</div>
					<div>
						<dt class="text-subtext0">
							{m.work_arch_label()}
						</dt>
						<dd class="mt-1.5 text-text">Layered</dd>
					</div>
				</dl>
			</BrowserFrame>
		</GridCell>

		<GridCell class="sm:col-span-2" fadeSides>
			{@render label(m.hl_label())}
			<Highlights />
		</GridCell>

		<GridCell class="items-center text-center sm:col-span-2">
			<p class="max-w-md font-bold tracking-tight text-base">{m.outro_text()}</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<a
					href={resolve(href('/projects') as Path)}
					class="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3.5 text-xs font-bold text-crust transition-colors hover:bg-accent-bright"
				>
					{m.nav_projects()}
					<ArrowRight class="size-3.5" aria-hidden="true" />
				</a>
				<a
					href={resolve(href('/contact') as Path)}
					class="inline-flex h-9 items-center rounded-md border border-surface1 bg-mantle px-3.5 text-xs font-bold text-text transition-colors hover:border-accent hover:text-accent"
				>
					{m.nav_contact()}
				</a>
			</div>
			<p class="mt-6 flex items-center gap-2 text-xs text-subtext0">
				<span class="size-2 rounded-full bg-green" aria-hidden="true"></span>
				{m.outro_status()}
			</p>
		</GridCell>
	</GridFrame>
</section>
