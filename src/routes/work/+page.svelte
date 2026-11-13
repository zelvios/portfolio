<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import { work } from '#lib/work/index.js';
	import Section from '#lib/components/ui/Section.svelte';
	import Band from '#lib/components/ui/Band.svelte';
	import WorkRow from '#lib/components/ui/WorkRow.svelte';
	import Seo from '#lib/components/ui/Seo.svelte';

	const groups = $derived([
		{
			id: 'experience',
			label: m.work_experience_label(),
			items: work.filter((w) => w.kind === 'experience')
		},
		{
			id: 'projects',
			label: m.work_projects_label(),
			items: work.filter((w) => w.kind === 'project')
		}
	]);
</script>

<Seo title={m.work_meta_title()} description={m.work_description()} />

<Section id="work-intro" compact centered class="z-10">
	<div class="py-18">
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{m.work_title()}</h1>
		<p class="mt-4 max-w-prose text-sm leading-relaxed text-subtext0">{m.work_description()}</p>
	</div>
</Section>

<Band class="-mt-16">
	{#each groups as group (group.id)}
		<section class="mt-12 first:mt-0" aria-labelledby="work-{group.id}">
			<h2 id="work-{group.id}" class="text-xl font-bold tracking-tight text-text sm:text-2xl">
				{group.label}
			</h2>

			<ul class="mt-4 divide-y divide-surface0 border-y border-surface0">
				{#each group.items as item (item.slug)}
					<li>
						<WorkRow
							href={resolve(href(`/work/${item.slug}`) as Path)}
							name={item.name}
							text={item.summary()}
							tag={item.tag}
							date={item.date}
							dateEnd={item.dateEnd}
							image={item.image}
						/>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</Band>
