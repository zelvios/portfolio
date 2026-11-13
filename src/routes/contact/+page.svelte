<script lang="ts">
	import type { Path } from '$app/types';
	import { resolve } from '$app/paths';
	import { GitBranch, Mail } from '@lucide/svelte';
	import { href } from '#lib/i18n.js';
	import * as m from '#lib/paraglide/messages.js';
	import { work } from '#lib/work/index.js';
	import Seo from '#lib/components/ui/Seo.svelte';
	import Shot from '#lib/components/ui/Shot.svelte';
	import ContactCard from '#lib/components/ui/ContactCard.svelte';
	import DotPattern from '#lib/components/ui/DotPattern.svelte';

	const previews = work.filter((entry) => entry.image);
</script>

<Seo description={m.contact_description()} title={m.contact_meta_title()} />

<div
	class="relative grid flex-1 items-center gap-12 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:gap-16"
>
	<div aria-hidden="true" class="pointer-events-none absolute -inset-x-16 -inset-y-16 -z-10">
		<DotPattern
			dotClass="text-overlay0/40"
			glow={12}
			class="mask-[radial-gradient(ellipse_60%_55%_at_50%_50%,black,transparent)]"
		/>
	</div>
	<!-- left -->
	<div class="max-w-md">
		<h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{m.contact_title()}</h1>
		<p class="mt-4 max-w-xs text-sm leading-relaxed text-subtext0">{m.contact_description()}</p>

		<div class="mt-8 flex flex-wrap gap-3">
			{#each previews as entry (entry.slug)}
				<a
					href={resolve(href(`/work/${entry.slug}`) as Path)}
					aria-label={entry.name}
					class="group relative block aspect-[16/10] w-48 rounded-md bg-surface0 p-0.5 shadow-lg shadow-crust/70"
				>
					<span
						class="block h-full w-full overflow-hidden rounded-[calc(var(--radius-md)-2px)] bg-mantle"
					>
						{#if entry.image}
							<Shot src={entry.image} alt="" fit="cover" sizes="192px" class="object-top" />
						{/if}
					</span>
					<span
						aria-hidden="true"
						class="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-accent mask-[radial-gradient(ellipse_60%_90%_at_100%_0%,black,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></span>
				</a>
			{/each}
		</div>
	</div>

	<!-- right -->
	<div class="flex flex-col gap-8">
		<ContactCard href="mailto:contact@jacob-j.com" label="Email" value="contact@jacob-j.com">
			<Mail aria-hidden="true" class="size-6" />
		</ContactCard>
		<ContactCard
			external
			href="https://github.com/zelvios"
			label="GitHub"
			value="github.com/zelvios"
		>
			<GitBranch aria-hidden="true" class="size-6" />
		</ContactCard>
	</div>
</div>
