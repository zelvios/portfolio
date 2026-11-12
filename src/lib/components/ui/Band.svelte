<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<div
	class="relative isolate -mb-16 flex-1 pt-10 pb-16
		before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2
		before:border-t before:border-surface0 before:bg-mantle {className}"
>
	{@render children()}
</div>
