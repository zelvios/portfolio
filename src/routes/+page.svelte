<script lang="ts">
	import * as m from '#lib/paraglide/messages.js';
	import { getLocale, localizeHref } from '#lib/paraglide/runtime.js';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import Intro from '#lib/components/sections/Intro.svelte';
	import HomeOverview from '#lib/components/sections/HomeOverview.svelte';
	import Seo from '#lib/components/ui/Seo.svelte';

	const site = 'https://jacob-j.com';

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'ProfilePage',
					'@id': `${site}${localizeHref('/')}#page`,
					url: `${site}${localizeHref('/')}`,
					name: m.meta_title(),
					inLanguage: getLocale(),
					isPartOf: { '@id': `${site}/#website` },
					mainEntity: { '@id': `${site}/#person` }
				},
				{
					'@type': 'Person',
					'@id': `${site}/#person`,
					name: 'Jacob Jørgensen',
					givenName: 'Jacob',
					familyName: 'Jørgensen',
					alternateName: ['Jacob Jorgensen', 'Jacob Joergensen', 'zelvios'],
					url: `${site}/`,
					image: `${site}/og.png`,
					jobTitle: 'Software Developer',
					description: m.meta_description(),
					address: { '@type': 'PostalAddress', addressCountry: 'DK' },
					knowsAbout: ['Rust', 'C#', 'TypeScript', 'SvelteKit', 'PostgreSQL'],
					sameAs: ['https://github.com/zelvios']
				},
				{
					'@type': 'WebSite',
					'@id': `${site}/#website`,
					url: `${site}/`,
					name: 'Jacob Jørgensen',
					alternateName: [
						'Jacob Portfolio',
						"Jacob's Portfolio",
						'Jacob Jørgensen Portfolio',
						'Jacob Joergensen Portfolio',
						'Jacob Jorgensen Portfolio',
						'jacob-j.com'
					],
					inLanguage: ['en', 'da'],
					publisher: { '@id': `${site}/#person` }
				}
			]
		})
	);
</script>

<Seo title={m.meta_title()} description={m.meta_description()} />
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built above, no user input -->
	{@html `<script type="application/ld+json">${jsonLd}</` + `script>`}
</svelte:head>

<Hero />
<div data-sticky-sentinel class="mt-16 h-px"></div>
<Header hero />
<Intro />
<HomeOverview />
