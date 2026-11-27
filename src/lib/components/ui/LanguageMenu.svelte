<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Check, ChevronDown } from '@lucide/svelte';
	import { getLocale, locales, type Locale } from '#lib/paraglide/runtime.js';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import Flag from '#lib/components/ui/Flag.svelte';

	interface Props {
		variant?: 'menu' | 'list';
	}

	let { variant = 'menu' }: Props = $props();

	const id = $props.id();

	const names: Record<Locale, string> = { en: 'English', da: 'Dansk' };

	const current = $derived(getLocale());
	const options = $derived(
		locales.map((locale) => ({
			locale,
			name: names[locale],
			href: resolve(href(page.url.pathname, locale) as Path)
		}))
	);
</script>

{#snippet list()}
	<ul class="flex flex-col">
		{#each options as option (option.locale)}
			<li>
				<a
					href={option.href}
					hreflang={option.locale}
					lang={option.locale}
					data-sveltekit-reload
					aria-current={option.locale === current ? 'true' : undefined}
					class="flex items-center gap-2.5 rounded px-3 py-2 hover:bg-surface0 aria-current:font-bold aria-current:text-accent"
				>
					<Flag locale={option.locale} class="h-3 w-4 shrink-0 rounded-xs" />
					{option.name}
					{#if option.locale === current}
						<Check class="ml-auto size-3.5" aria-hidden="true" />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#if variant === 'menu'}
	<button
		type="button"
		popovertarget="lang-{id}"
		aria-label={m.nav_switch_locale()}
		style="anchor-name: --lang-{id}"
		class="flex h-7 items-center gap-1.5 px-2 font-bold uppercase transition-colors hover:text-accent"
	>
		<Flag locale={current} class="h-3 w-4 rounded-xs" />
		{current}
		<ChevronDown class="size-3" aria-hidden="true" />
	</button>

	<div
		popover
		id="lang-{id}"
		style="position-anchor: --lang-{id}"
		class="inset-auto top-[calc(anchor(bottom)+0.5rem)] right-[anchor(right)] m-0 min-w-40 rounded-md border border-surface1 bg-mantle p-1 text-xs text-text shadow-lg shadow-crust/60"
	>
		{@render list()}
	</div>
{:else}
	{@render list()}
{/if}
