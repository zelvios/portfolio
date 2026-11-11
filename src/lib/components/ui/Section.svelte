<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		id?: string;
		class?: string;
		children?: Snippet;
	}

	let { title, id, class: className = '', children }: Props = $props();
</script>

<section {id} class="relative py-16 {className}">
	<!-- top-left -->
	<span
		aria-hidden="true"
		class="absolute -top-8 left-0 h-72 w-[1.5px] bg-linear-to-t from-surface1 via-surface1 via-40% to-transparent"
	></span>
	<span
		aria-hidden="true"
		class="absolute top-16 right-1/2 -left-16 h-[1.5px] bg-linear-to-r from-surface1 to-transparent sm:-left-32"
	></span>

	<h2 class="absolute top-19 left-8 flex items-center gap-2.5 text-sm font-bold text-accent">
		<span class="h-px w-2 bg-accent" aria-hidden="true"></span>
		{title}
	</h2>

	<div class="flex min-h-[30dvh] flex-col justify-center py-16 pl-8 sm:pr-8">
		{@render children?.()}
	</div>

	<!-- bottom-right -->
	<span
		aria-hidden="true"
		class="absolute right-0 -bottom-8 h-72 w-[1.5px] bg-linear-to-b from-surface1 via-surface1 via-40% to-transparent"
	></span>
	<span
		aria-hidden="true"
		class="absolute -right-16 bottom-16 left-1/2 h-[1.5px] bg-linear-to-l from-surface1 to-transparent sm:-right-32"
	></span>
</section>
