<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import Intro from '#lib/components/sections/Intro.svelte';
	import Work from '#lib/components/sections/Work.svelte';

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Person',
					'@id': 'https://jacob-j.com/#person',
					name: 'Jacob Jørgensen',
					url: 'https://jacob-j.com',
					image: 'https://jacob-j.com/og.png',
					jobTitle: 'Software Developer',
					description: m.meta_description(),
					address: { '@type': 'PostalAddress', addressCountry: 'DK' },
					knowsAbout: ['Rust', 'C#', 'TypeScript', 'SvelteKit', 'PostgreSQL'],
					sameAs: ['https://github.com/zelvios']
				},
				{
					'@type': 'WebSite',
					'@id': 'https://jacob-j.com/#website',
					url: 'https://jacob-j.com',
					name: 'Jacob Jørgensen – Portfolio',
					inLanguage: ['en', 'da'],
					author: { '@id': 'https://jacob-j.com/#person' }
				}
			]
		})
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built above, no user input -->
	{@html `<script type="application/ld+json">${jsonLd}</` + `script>`}
</svelte:head>

<Hero />
<div data-sticky-sentinel class="mt-16 h-px"></div>
<Header hero />
<Intro />
<Work />
