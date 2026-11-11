<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		size?: 'sm' | 'md';
		/** open in a new tab (for links leaving the site) */
		external?: boolean;
		class?: string;
		children: Snippet;
	}

	let { href, size = 'md', external = false, class: className = '', children }: Props = $props();

	const base =
		'inline-flex items-center gap-2 rounded-md border border-surface1 bg-mantle font-bold text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
	const sizes = {
		sm: 'h-7 px-2.5 text-xs',
		md: 'h-9 px-3.5 text-xs'
	};
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class="{base} {sizes[size]} {className}"
>
	{@render children()}
</a>
