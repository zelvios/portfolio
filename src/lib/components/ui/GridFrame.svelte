<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Tailwind grid-cols class for sm and up */
		cols?: string;
		class?: string;
		children: Snippet;
	}

	let { cols = 'sm:grid-cols-2', class: className = '', children }: Props = $props();

	// long overshoots at the outer corners
	const v =
		'pointer-events-none absolute h-20 w-[1.5px] bg-linear-to-t from-surface1 to-transparent';
	const h =
		'pointer-events-none absolute w-20 h-[1.5px] bg-linear-to-l from-surface1 to-transparent';
</script>

<div class="relative my-20 grid {cols} {className}">
	<!-- top-left -->
	<span aria-hidden="true" class="{v} -top-20 left-0 -translate-x-1/2"></span>
	<span aria-hidden="true" class="{h} top-0 -left-20 -translate-y-1/2"></span>
	<!-- top-right -->
	<span aria-hidden="true" class="{v} -top-20 right-0 translate-x-1/2"></span>
	<span aria-hidden="true" class="{h} top-0 -right-20 -translate-y-1/2 rotate-180"></span>
	<!-- bottom-left -->
	<span aria-hidden="true" class="{v} -bottom-20 left-0 -translate-x-1/2 rotate-180"></span>
	<span aria-hidden="true" class="{h} bottom-0 -left-20 translate-y-1/2"></span>
	<!-- bottom-right -->
	<span aria-hidden="true" class="{v} right-0 -bottom-20 translate-x-1/2 rotate-180"></span>
	<span aria-hidden="true" class="{h} -right-20 bottom-0 translate-y-1/2 rotate-180"></span>

	{@render children()}
</div>
