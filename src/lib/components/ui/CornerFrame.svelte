<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		glow?: boolean;
		class?: string;
		children: Snippet;
	}

	let { glow = false, class: className = '', children }: Props = $props();

	const corner = 'pointer-events-none absolute size-3 border-surface1';
</script>

<div
	data-spot={glow || undefined}
	class="group relative border border-surface0 bg-base shadow-lg shadow-crust/60 {className}"
>
	{#if glow}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(200px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_60%)] group-hover:opacity-100"
		></span>
	{/if}

	<span aria-hidden="true" class="{corner} -top-px -left-px border-t-2 border-l-2"></span>
	<span aria-hidden="true" class="{corner} -top-px -right-px border-t-2 border-r-2"></span>
	<span aria-hidden="true" class="{corner} -bottom-px -left-px border-b-2 border-l-2"></span>
	<span aria-hidden="true" class="{corner} -right-px -bottom-px border-r-2 border-b-2"></span>

	<div class="relative">
		{@render children()}
	</div>
</div>
