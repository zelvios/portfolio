<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import GridFrame from '#lib/components/ui/GridFrame.svelte';
	import GridCell from '#lib/components/ui/GridCell.svelte';
	import BrowserFrame from '#lib/components/ui/BrowserFrame.svelte';
	import GitFlow from '#lib/components/ui/GitFlow.svelte';
	import Highlights from '#lib/components/sections/Highlights.svelte';
</script>

{#snippet label(index: string, text: string)}
	<h2 class="flex items-baseline gap-3 text-xs font-bold tracking-[0.2em] uppercase">
		<span class="text-accent">{index}</span>
		<span class="text-subtext0">{text}</span>
	</h2>
{/snippet}

<section id="work" class="mt-48">
	<GridFrame cols="sm:grid-cols-[1fr_2fr]">
		<GridCell>
			{@render label('02', m.work_values_label())}
			<ul class="my-auto divide-y divide-surface0 text-sm text-text">
				<li class="py-2.5 first:pt-0">{m.work_values_1()}</li>
				<li class="py-2.5 first:pt-0">{m.work_values_2()}</li>
				<li class="py-2.5 last:pb-0">{m.work_values_3()}</li>
			</ul>
		</GridCell>

		<GridCell>
			{@render label('03', m.work_method_label())}
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
						<dt class="font-bold tracking-[0.2em] text-subtext0 uppercase">
							{m.work_process_label()}
						</dt>
						<dd class="mt-1.5 text-text">Agile - Scrum - Kanban - Issues - Pull requests</dd>
					</div>
					<div>
						<dt class="font-bold tracking-[0.2em] text-subtext0 uppercase">
							{m.work_arch_label()}
						</dt>
						<dd class="mt-1.5 text-text">Layered</dd>
					</div>
				</dl>
			</BrowserFrame>
		</GridCell>

		<GridCell class="sm:col-span-2" fadeSides>
			{@render label('04', m.hl_label())}
			<Highlights />
		</GridCell>

		<GridCell class="sm:col-span-2">
			{@render label('05', m.contact_title())}
			<p class="mt-4 text-sm leading-relaxed text-subtext0">asdasdasd</p>
		</GridCell>
	</GridFrame>
</section>
