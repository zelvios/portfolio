<script lang="ts">
	import type { Component } from 'svelte';
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { ArrowLeft, ExternalLink } from '@lucide/svelte';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import { work } from '#lib/work/index.js';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';
	import Band from '#lib/components/ui/Band.svelte';
	import Seo from '#lib/components/ui/Seo.svelte';

	let { data } = $props();

	const contents = import.meta.glob<Component>('/src/lib/work/content/*.svelte', {
		eager: true,
		import: 'default'
	});

	const entry = $derived(work.find((item) => item.slug === data.slug)!);
	const Content = $derived(
		contents[`/src/lib/work/content/${data.slug}.${getLocale()}.svelte`] ??
			contents[`/src/lib/work/content/${data.slug}.en.svelte`]
	);
</script>

<Seo title="{entry.name} - Jacob Jørgensen" description={entry.summary()} />

<a
	href={resolve(href('/work') as Path)}
	class="inline-flex items-center gap-1.5 self-start text-sm text-subtext0 transition-colors hover:text-accent"
>
	<ArrowLeft class="size-4" aria-hidden="true" />
	{m.work_back()}
</a>

<header class="mt-8">
	<h1 class="text-4xl font-extrabold tracking-tight text-accent">{entry.name}</h1>
	<p class="mt-2 text-lg text-text">{entry.summary()}</p>
	<div class="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-subtext0">
		<span>{entry.tag}</span>
		<span class="flex items-center gap-4">
			<time>{entry.date}</time>
			{#if entry.repo}
				<ButtonLink href={entry.repo} size="sm" external>
					<ExternalLink class="size-3.5" aria-hidden="true" />
					GitHub
				</ButtonLink>
			{/if}
		</span>
	</div>
</header>

<Band class="mt-10">
	<article class="article">
		{#if Content}
			<Content />
		{/if}
	</article>
</Band>
