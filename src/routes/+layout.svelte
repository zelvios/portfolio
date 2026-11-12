<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, locales } from '#lib/paraglide/runtime.js';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import Header from '#lib/components/layout/Header.svelte';
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
	<meta content="Jacob Jørgensen" name="author" />
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
	<meta content={m.meta_title()} property="og:image:alt" />
	<meta content={ogLocale} property="og:locale" />
	<meta content="summary_large_image" name="twitter:card" />

	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={site + href(page.url.pathname, locale)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={site + href(page.url.pathname, 'en')} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	{#if page.route.id !== '/'}
		<Header />
	{/if}
	<main class="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-16 sm:px-8">
		{@render children()}
	</main>
</div>
