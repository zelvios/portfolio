<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import Seo from '#lib/components/ui/Seo.svelte';
	import Section from '#lib/components/ui/Section.svelte';
	import Band from '#lib/components/ui/Band.svelte';
	import CornerFrame from '#lib/components/ui/CornerFrame.svelte';
	import Timeline from '#lib/components/ui/Timeline.svelte';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { ArrowRight, ExternalLink } from '@lucide/svelte';
	import { href } from '#lib/i18n.js';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';

	const timeline = $derived([
		{
			label: m.about_tl_kind_work(),
			date: 'Nov 2025 - Jan 2027',
			title: 'PakkecenterNORD',
			text: m.about_tl_pcn(),
			slug: 'pakkecenternord'
		},
		{
			label: m.about_tl_kind_edu(),
			date: 'Mar 2021 - Oct 2026',
			title: 'TECHCOLLEGE',
			text: m.about_tl_school()
		}
	]);

	const heading = 'text-xl font-bold tracking-tight text-text sm:text-2xl';
</script>

<Seo title={m.about_meta_title()} description={m.about_description()} />

<Section id="about-intro" compact centered class="z-10">
	<div class="flex h-[clamp(8rem,15dvh,20rem)] flex-col items-center justify-center">
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{m.about_title()}</h1>
		<p class="mt-4 max-w-prose text-sm leading-relaxed text-subtext0">{m.about_description()}</p>
	</div>
</Section>

<Band class="-mt-16">
	<!-- bio + facts -->
	<div class="grid gap-12 sm:grid-cols-[minmax(0,1fr)_16rem]">
		<div>
			<div class="article">
				<p>{m.about_bio_1()}</p>
				<p>
					{m.about_bio_2_pre()}
					<a
						href="https://github.com/zelvios/dotfiles"
						target="_blank"
						rel="noopener noreferrer"
						class="underline">{m.about_bio_2_link()}</a
					>{m.about_bio_2_post()}
				</p>
			</div>

			<a
				href="https://github.com/zelvios"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-6 inline-flex items-center gap-1.5 text-sm text-subtext0 transition-colors hover:text-accent"
			>
				<ExternalLink class="size-3.5" aria-hidden="true" />
				github.com/zelvios
			</a>
		</div>

		<CornerFrame class="self-start p-5">
			<dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-xs">
				<dt class="text-subtext0">{m.about_fact_based()}</dt>
				<dd class="text-text">{m.about_fact_based_value()}</dd>
				<dt class="text-subtext0">{m.about_fact_born()}</dt>
				<dd class="text-text">2002</dd>
				<dt class="text-subtext0">{m.about_fact_languages()}</dt>
				<dd class="text-text">{m.about_fact_languages_value()}</dd>
			</dl>
		</CornerFrame>
	</div>

	<!-- timeline -->
	<section class="mt-16" aria-labelledby="about-timeline">
		<div
			class="rounded-lg border border-surface0 bg-base px-5 pt-6 pb-6 shadow-lg shadow-crust/60 sm:px-8"
		>
			<h2 id="about-timeline" class={heading}>{m.about_timeline_label()}</h2>

			<div class="mt-6 border-t border-surface0 pt-8">
				<Timeline entries={timeline} more={m.about_read_more()} />
			</div>

			<div class="flex justify-center border-t border-surface0 pt-6">
				<ButtonLink href={resolve(href('/work') as Path)}>
					{m.about_more_work()}
					<ArrowRight class="size-3.5" aria-hidden="true" />
				</ButtonLink>
			</div>
		</div>
	</section>
</Band>
