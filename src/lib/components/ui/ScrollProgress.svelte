<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<div
	aria-hidden="true"
	class="from-accent-dim to-accent-bright absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-(--scroll,0) bg-linear-to-r via-accent {className}"
></div>
