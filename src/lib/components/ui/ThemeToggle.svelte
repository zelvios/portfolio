<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';

	let { label, class: className = '' }: { label: string; class?: string } = $props();
</script>

<button
	type="button"
	data-theme-toggle
	aria-label={label}
	class="text-subtext0 transition-colors hover:text-accent {className}"
>
	<Sun class="size-4 not-dark:hidden" aria-hidden="true" />
	<Moon class="size-4 dark:hidden" aria-hidden="true" />
</button>
