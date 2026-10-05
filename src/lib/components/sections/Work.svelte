<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import GridFrame from '#lib/components/ui/GridFrame.svelte';
	import GridCell from '#lib/components/ui/GridCell.svelte';

	const methods = ['Scrum', 'Git', 'CI/CD', 'Code review'];
</script>

{#snippet label(index: string, text: string)}
	<h2 class="flex items-baseline gap-3 text-xs font-bold tracking-[0.2em] uppercase">
		<span class="text-accent">{index}</span>
		<span class="text-subtext0">{text}</span>
	</h2>
{/snippet}

<section id="work" class="mt-32">
	<GridFrame cols="sm:grid-cols-[1fr_2fr]">
		<GridCell>
			{@render label('02', m.work_values_label())}
			<ul class="mt-4 divide-y divide-surface0 text-sm text-text">
				<li class="py-2.5 first:pt-0">{m.work_values_1()}</li>
				<li class="py-2.5 first:pt-0">{m.work_values_2()}</li>
				<li class="py-2.5 last:pb-0">{m.work_values_3()}</li>
			</ul>
		</GridCell>

		<GridCell>
			{@render label('03', m.method_label())}
			<ul class="mt-4 flex flex-wrap gap-2 text-xs text-subtext0">
				{#each methods as item (item)}
					<li class="rounded border border-surface0 bg-mantle px-2 py-1">{item}</li>
				{/each}
			</ul>
		</GridCell>

		<GridCell class="sm:col-span-2">
			{@render label('04', m.projects_title())}
			<p class="mt-4 text-sm leading-relaxed text-subtext0">asdasdasd</p>
		</GridCell>

		<GridCell class="sm:col-span-2">
			{@render label('05', m.contact_title())}
			<p class="mt-4 text-sm leading-relaxed text-subtext0">asdasdasd</p>
		</GridCell>
	</GridFrame>
</section>
