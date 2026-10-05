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

	let { hero = false }: { hero?: boolean } = $props();

	const home = $derived(resolve(href('/') as Path));
	const otherLocale = $derived(getLocale() === 'da' ? 'en' : 'da');
	const switchHref = $derived(resolve(href(page.url.pathname, otherLocale) as Path));

	const links = $derived([
		{ route: '/about', href: resolve(href('/about') as Path), label: m.nav_about() },
		{ route: '/projects', href: resolve(href('/projects') as Path), label: m.nav_projects() },
		{ route: '/contact', href: resolve(href('/contact') as Path), label: m.nav_contact() }
	]);

	const pill =
		'rounded-md border border-surface1 bg-mantle px-4 py-2 transition-all duration-300 group-data-stuck:border-transparent group-data-stuck:bg-transparent group-data-stuck:px-2 group-data-stuck:py-1';
</script>

{#snippet navLinks(itemClass: string)}
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
{/snippet}

<header
	class="group sticky top-0 isolate z-40
	before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2
	before:border-b before:border-transparent before:transition-colors before:duration-300
	data-stuck:before:border-surface0 data-stuck:before:bg-crust/80 data-stuck:before:backdrop-blur"
	data-stuck={!hero || undefined}
>
	<nav
		aria-label={m.nav_label()}
		class="mx-auto flex min-h-14 w-full max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-6 py-2
		group-data-stuck:grid group-data-stuck:h-14 group-data-stuck:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] group-data-stuck:gap-0 group-data-stuck:py-0
		sm:grid sm:h-14 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-0 sm:py-0
		{hero ? '' : 'px-4 sm:px-8'}"
	>
		<!-- logo: reserved space -->
		<a
			aria-label={m.nav_home()}
			class="invisible hidden items-center gap-2 justify-self-start font-bold opacity-0 transition-opacity duration-300 group-data-stuck:visible group-data-stuck:flex group-data-stuck:opacity-100 hover:text-accent sm:flex"
			href={home}
		>
			<Logo class="size-6" />
			<span class="hidden sm:inline">jacob-j</span>
		</a>

		<!-- links -->
		<ul
			class="flex items-center gap-3 text-sm text-text group-data-stuck:gap-2 group-data-stuck:text-subtext0 max-sm:group-data-stuck:hidden"
		>
			{@render navLinks(pill)}
		</ul>

		<span aria-hidden="true" class="basis-full group-data-stuck:hidden sm:hidden"></span>

		<!-- language and theme -->
		<ul
			class="flex items-center divide-x divide-surface1 justify-self-end overflow-hidden rounded-md border border-surface1 bg-mantle text-xs text-text group-data-stuck:text-subtext0 max-sm:group-data-stuck:hidden"
		>
			<li>
				<a
					aria-label={m.nav_switch_locale()}
					class="flex h-7 items-center px-2 font-bold uppercase transition-colors hover:text-accent"
					data-sveltekit-reload
					href={switchHref}
					hreflang={otherLocale}
					lang={otherLocale}
				>
					{otherLocale}
				</a>
			</li>
			<li>
				<ThemeToggle class="flex h-7 items-center px-2" label={m.theme_toggle()} />
			</li>
		</ul>

		<!-- mobile burger -->
		<MobileMenu
			class="hidden justify-self-end max-sm:group-data-stuck:block sm:hidden"
			id="mobile-menu"
			label={m.nav_menu()}
		>
			<ul class="flex flex-col">
				{@render navLinks('block rounded px-3 py-2 hover:bg-surface0')}
				<li>
					<a
						aria-label={m.nav_switch_locale()}
						class="block rounded px-3 py-2 font-bold uppercase hover:bg-surface0"
						data-sveltekit-reload
						href={switchHref}
						hreflang={otherLocale}
						lang={otherLocale}>{otherLocale}</a
					>
				</li>
				<li>
					<ThemeToggle class="block rounded px-3 py-2 hover:bg-surface0" label={m.theme_toggle()} />
				</li>
			</ul>
		</MobileMenu>
	</nav>
	<ScrollProgress />
</header>
