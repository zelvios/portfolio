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
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
</script>

{#snippet label(text: string)}
	<h2 class="flex items-center gap-2.5 text-sm font-bold text-accent">
		<span class="h-px w-2 bg-accent" aria-hidden="true"></span>
		{text}
	</h2>
{/snippet}

<section id="home-overview" class="mt-48">
	<GridFrame cols="sm:grid-cols-[1fr_2fr]">
		<GridCell>
			{@render label(m.home_values_label())}
			<ul class="my-auto divide-y divide-surface0 text-sm text-text">
				<li class="py-2.5 first:pt-0">{m.home_values_1()}</li>
				<li class="py-2.5 first:pt-0">{m.home_values_2()}</li>
				<li class="py-2.5 last:pb-0">{m.home_values_3()}</li>
			</ul>
		</GridCell>

		<GridCell>
			{@render label(m.home_workmethod_label())}
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
							{m.home_workmethod_process_label()}
						</dt>
						<dd class="mt-1.5 text-text">Agile - Scrum - Kanban - Issues - Pull requests</dd>
					</div>
					<div>
						<dt class="text-subtext0">
							{m.home_workmethod_arch_label()}
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
			<p class="max-w-md font-bold tracking-tight text-text">{m.outro_text()}</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<ButtonLink href={resolve(href('/work') as Path)}>
					{m.nav_work()}
					<ArrowRight class="size-3.5" aria-hidden="true" />
				</ButtonLink>
				<ButtonLink href={resolve(href('/contact') as Path)}>
					{m.nav_contact()}
				</ButtonLink>
			</div>
		</GridCell>
	</GridFrame>
</section>
