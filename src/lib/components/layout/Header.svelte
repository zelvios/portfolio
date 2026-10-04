<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { getLocale } from '#lib/paraglide/runtime.js';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import Logo from '#lib/components/ui/Logo.svelte';
	import ScrollProgress from '#lib/components/ui/ScrollProgress.svelte';
	import MobileMenu from '#lib/components/ui/MobileMenu.svelte';
	import ThemeToggle from '#lib/components/ui/ThemeToggle.svelte';

	const home = $derived(resolve(href('/') as Path));
	const otherLocale = $derived(getLocale() === 'da' ? 'en' : 'da');
	const switchHref = $derived(resolve(href(page.url.pathname, otherLocale) as Path));

	const links = $derived([
		{ route: '/about', href: resolve(href('/about') as Path), label: m.nav_about() },
		{ route: '/projects', href: resolve(href('/projects') as Path), label: m.nav_projects() },
		{ route: '/contact', href: resolve(href('/contact') as Path), label: m.nav_contact() }
	]);
</script>

{#snippet navItems(itemClass: string)}
	{#each links as link (link.href)}
		<li>
			<a
				href={link.href}
				aria-current={page.route.id === link.route ? 'page' : undefined}
				class="transition-colors hover:text-accent aria-[current=page]:font-bold aria-[current=page]:text-accent {itemClass}"
			>
				{link.label}
			</a>
		</li>
	{/each}
	<li>
		<a
			href={switchHref}
			hreflang={otherLocale}
			lang={otherLocale}
			data-sveltekit-reload
			aria-label={m.nav_switch_locale()}
			class="font-bold uppercase transition-colors hover:text-accent {itemClass}"
		>
			{otherLocale}
		</a>
	</li>
	<li>
		<ThemeToggle label={m.theme_toggle()} class={itemClass} />
	</li>
{/snippet}

<header class="sticky top-0 z-40 border-b border-surface0 bg-crust/80 backdrop-blur">
	<nav
		aria-label={m.nav_label()}
		class="group mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-8"
	>
		<a
			href={home}
			class="flex items-center gap-2 font-bold hover:text-accent"
			aria-label={m.nav_home()}
		>
			<Logo class="size-6" />
			<span>jacob-j</span>
		</a>

		<!-- desktop -->
		<ul class="hidden items-center gap-5 text-sm text-subtext0 sm:flex">
			{@render navItems('')}
		</ul>

		<!-- mobile -->
		<MobileMenu id="mobile-menu" label={m.nav_menu()} class="sm:hidden">
			<ul class="flex flex-col">
				{@render navItems('block rounded px-3 py-2 hover:bg-surface0')}
			</ul>
		</MobileMenu>
	</nav>
	<ScrollProgress />
</header>
