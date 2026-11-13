<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		glow?: boolean;
		class?: string;
		children: Snippet;
	}

	let { glow = false, class: className = '', children }: Props = $props();

	const h =
		'pointer-events-none absolute h-[1.5px] w-12 -translate-y-1/2 bg-linear-to-r from-transparent via-surface1 to-transparent';
	const v =
		'pointer-events-none absolute h-12 w-[1.5px] -translate-x-1/2 bg-linear-to-b from-transparent via-surface1 to-transparent';
</script>

<div
	data-spot={glow || undefined}
	class="group relative border border-surface0 bg-mantle {className}"
>
	{#if glow}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(200px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_60%)] group-hover:opacity-100"
		></span>
	{/if}

	<span aria-hidden="true" class="{h} top-0 -left-6"></span>
	<span aria-hidden="true" class="{v} -top-6 left-0"></span>
	<span aria-hidden="true" class="{h} top-0 -right-6"></span>
	<span aria-hidden="true" class="{v} -top-6 right-0 translate-x-1/2"></span>
	<span aria-hidden="true" class="{h} bottom-0 -left-6 translate-y-1/2"></span>
	<span aria-hidden="true" class="{v} -bottom-6 left-0"></span>
	<span aria-hidden="true" class="{h} -right-6 bottom-0 translate-y-1/2"></span>
	<span aria-hidden="true" class="{v} right-0 -bottom-6 translate-x-1/2"></span>

	<div class="relative">
		{@render children()}
	</div>
</div>
