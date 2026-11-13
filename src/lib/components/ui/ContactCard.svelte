<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowUpRight } from '@lucide/svelte';

	interface Props {
		href: string;
		label: string;
		value: string;
		external?: boolean;
		children: Snippet;
	}

	let { href, label, value, external = false, children }: Props = $props();
</script>

<a
	class="group relative flex items-center gap-4 rounded-md border border-surface1 bg-mantle px-5 py-6"
	data-spot
	{href}
	rel={external ? 'noopener noreferrer' : undefined}
	target={external ? '_blank' : undefined}
>
	<span
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_60%)] group-hover:opacity-100"
	></span>
	<span
		aria-hidden="true"
		class="pointer-events-none absolute -inset-px z-10 rounded-[inherit] border border-accent mask-[radial-gradient(ellipse_60%_90%_at_0%_0%,black,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></span>

	<span class="relative text-subtext0 transition-colors group-hover:text-accent">
		{@render children()}
	</span>

	<span class="relative min-w-0 flex-1">
		<span class="block text-xs text-subtext0 transition-colors group-hover:text-accent"
			>{label}</span
		>
		<span class="mt-0.5 block truncate font-bold text-text">{value}</span>
	</span>

	<ArrowUpRight
		aria-hidden="true"
		class="relative size-4 shrink-0 text-subtext0 transition-colors group-hover:text-accent"
	/>
</a>
