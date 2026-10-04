<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, locales, localizeHref } from '#lib/paraglide/runtime.js';
	import * as m from '#lib/paraglide/messages.js';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();

	const site = 'https://jacob-j.com';
	const url = $derived(site + page.url.pathname);
	const ogLocale = $derived(getLocale() === 'da' ? 'da_DK' : 'en_US');
</script>

<svelte:head>
	<title>{m.meta_title()}</title>
	<meta content={m.meta_description()} name="description" />
	<link href={url} rel="canonical" />

	<link href={favicon} rel="icon" />
	<link href="/apple-touch-icon.png" rel="apple-touch-icon" />

	<meta content="website" property="og:type" />
	<meta content="Jacob Jørgensen" property="og:site_name" />
	<meta content={m.meta_title()} property="og:title" />
	<meta content={m.meta_description()} property="og:description" />
	<meta content={url} property="og:url" />
	<meta content="{site}/og.png" property="og:image" />
	<meta content="1200" property="og:image:width" />
	<meta content="630" property="og:image:height" />
	<meta content={ogLocale} property="og:locale" />
	<meta content="summary_large_image" name="twitter:card" />

	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={site + localizeHref(page.url.pathname, { locale })}
		/>
	{/each}
</svelte:head>

<div class="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-6 sm:px-8">
	<main class="flex-1 py-16">
		{@render children()}
	</main>
</div>
