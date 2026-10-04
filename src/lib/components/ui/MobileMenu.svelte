<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		label: string;
		class?: string;
		children: Snippet;
	}

	let { id, label, class: className = '', children }: Props = $props();
</script>

<div class="menu {className}">
	<button
		popovertarget={id}
		aria-label={label}
		class="-mr-2 rounded p-1 text-subtext0 transition-colors hover:text-accent"
	>
		<svg viewBox="0 0 32 32" class="size-7" aria-hidden="true">
			<path
				class="line top-bottom"
				d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
			/>
			<path class="line" d="M7 16 27 16" />
		</svg>
	</button>

	<div
		{id}
		popover
		class="fixed inset-x-4 top-16 bottom-auto m-0 w-auto rounded-lg border border-surface0 bg-mantle p-2 text-text shadow-lg"
	>
		{@render children()}
	</div>
</div>

<style>
	svg {
		transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line {
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 3;
		transition:
			stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
			stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.top-bottom {
		stroke-dasharray: 12 63;
	}

	.menu:has([popover]:popover-open) svg {
		transform: rotate(-45deg);
	}

	.menu:has([popover]:popover-open) .top-bottom {
		stroke-dasharray: 20 300;
		stroke-dashoffset: -32.42;
	}

	@media (prefers-reduced-motion: reduce) {
		svg,
		.line {
			transition: none;
		}
	}
</style>
