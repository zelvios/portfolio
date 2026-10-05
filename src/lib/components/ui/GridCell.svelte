<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props();

	const h =
		'pointer-events-none absolute -right-8 -left-8 h-[1.5px] bg-surface1 mask-[linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]';
	const v =
		'pointer-events-none absolute -top-8 -bottom-8 w-[1.5px] bg-surface1 mask-[linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-2rem),transparent)]';
</script>

<div class="relative min-h-58 p-6 sm:p-8 {className}">
	<span aria-hidden="true" class="{h} top-0 -translate-y-1/2"></span>
	<span aria-hidden="true" class="{h} bottom-0 translate-y-1/2"></span>
	<span aria-hidden="true" class="{v} left-0 -translate-x-1/2"></span>
	<span aria-hidden="true" class="{v} right-0 translate-x-1/2"></span>
	{@render children?.()}
</div>
