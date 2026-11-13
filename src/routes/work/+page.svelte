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
	import { ArrowRight } from '@lucide/svelte';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import DotPattern from '#lib/components/ui/DotPattern.svelte';

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
	<div class="flex h-[clamp(8rem,15dvh,20rem)] flex-col items-center justify-center">
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
	<div
		class="relative isolate mt-18 overflow-hidden rounded-lg border border-surface0 bg-base px-6 py-12 text-center shadow-lg shadow-crust/60"
	>
		<DotPattern
			dotClass="text-overlay0/40"
			class="mask-[radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]"
		/>

		<h2 class="text-xl font-bold tracking-tight text-text sm:text-2xl">{m.work_contact_title()}</h2>
		<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-subtext1">
			{m.work_contact_text()}
		</p>

		<div class="mt-6 flex justify-center">
			<ButtonLink href={resolve(href('/contact') as Path)}>
				{m.nav_contact()}
				<ArrowRight class="size-3.5" aria-hidden="true" />
			</ButtonLink>
		</div>
	</div>
</Band>
