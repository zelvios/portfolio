<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		url?: string;
		href?: string;
		class?: string;
		children?: Snippet;
	}

	let { url = 'jacob-j.com', href, class: className = '', children }: Props = $props();

	const pill =
		'mx-auto flex h-6 min-w-0 flex-1 items-center justify-center truncate rounded border border-surface0 bg-base px-2 text-[10px] text-subtext0 sm:max-w-xs sm:text-[11px]';
</script>

<div
	class="overflow-hidden rounded-lg border border-surface0 bg-base shadow-lg shadow-crust/60 {className}"
>
	<div class="flex h-9 items-center gap-3 border-b border-surface0 bg-mantle px-3">
		<div class="flex shrink-0 gap-1.5" aria-hidden="true">
			<span class="size-2.5 rounded-full bg-red"></span>
			<span class="size-2.5 rounded-full bg-yellow"></span>
			<span class="size-2.5 rounded-full bg-green"></span>
		</div>
		{#if href}
			<a
				{href}
				target="_blank"
				rel="noopener noreferrer"
				class="{pill} transition-colors hover:border-accent hover:text-accent">{url}</a
			>
		{:else}
			<div class={pill}>{url}</div>
		{/if}
		<div class="hidden w-13 shrink-0 sm:block" aria-hidden="true"></div>
	</div>

	<div class="min-h-56 px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
		{@render children?.()}
	</div>
</div>
