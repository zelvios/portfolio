<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	interface Props {
		src: Picture;
		alt: string;
		fit?: 'cover' | 'contain';
		sizes?: string;
		class?: string;
	}

	let {
		src,
		alt,
		fit = 'contain',
		sizes = '(min-width: 896px) 832px, 100vw',
		class: className = ''
	}: Props = $props();
</script>

<enhanced:img
	{src}
	{alt}
	{sizes}
	loading="lazy"
	decoding="async"
	class="h-full w-full {fit === 'contain' ? 'object-contain' : 'object-cover'} {className}"
/>
