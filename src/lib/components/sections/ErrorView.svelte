<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import ButtonLink from '#lib/components/ui/ButtonLink.svelte';

	let { status = 404 }: { status?: number } = $props();

	const notFound = $derived(status === 404);
</script>

<section class="flex min-h-[50dvh] flex-col items-center justify-center text-center">
	<p class="text-7xl font-extrabold tracking-tighter text-accent sm:text-8xl">{status}</p>
	<h1 class="mt-4 text-xl font-bold tracking-tight">
		{notFound ? m.error_404_title() : m.error_generic_title()}
	</h1>
	<p class="mt-2 max-w-md text-sm text-subtext0">
		{notFound ? m.error_404_text() : m.error_generic_text()}
	</p>
	<ButtonLink href={resolve(href('/') as Path)} class="mt-8">{m.error_back()}</ButtonLink>
</section>
