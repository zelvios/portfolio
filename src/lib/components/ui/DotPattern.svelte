<script lang="ts">
	interface Star {
		/** column and row on the dot grid */
		col: number;
		row: number;
		delay?: number;
		duration?: number;
	}

	interface Props {
		size?: number;
		radius?: number;
		stars?: Star[];
		class?: string;
	}

	let {
		size = 20,
		radius = 1.5,
		stars = [
			{ col: 4, row: 3, delay: 0, duration: 6 },
			{ col: 17, row: 2, delay: 1.3, duration: 7.5 },
			{ col: 29, row: 6, delay: 2.9, duration: 5.5 },
			{ col: 9, row: 11, delay: 4.1, duration: 8 },
			{ col: 23, row: 13, delay: 0.7, duration: 6.5 },
			{ col: 35, row: 10, delay: 3.4, duration: 7 },
			{ col: 14, row: 18, delay: 5.2, duration: 6 },
			{ col: 31, row: 20, delay: 2.2, duration: 8.5 }
		],
		class: className = ''
	}: Props = $props();

	const dots = $derived(
		`background-image: radial-gradient(circle, currentColor ${radius}px, transparent ${radius}px);
		 background-size: ${size}px ${size}px;
		 background-position: ${size / 2}px ${size / 2}px;`
	);

	const starStyle = (s: Star) =>
		`left: ${s.col * size}px; top: ${s.row * size}px;
	 width: ${radius * 2}px; height: ${radius * 2}px;
	 --twinkle-delay: ${s.delay ?? 0}s; --twinkle-duration: ${s.duration ?? 6}s;`;
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 {className}">
	<div class="absolute inset-0 text-overlay0/60" style={dots}></div>

	{#each stars as star, i (i)}
		<span
			class="animate-twinkle absolute -translate-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_var(--color-accent)] motion-reduce:hidden"
			style={starStyle(star)}
		></span>
	{/each}
</div>
