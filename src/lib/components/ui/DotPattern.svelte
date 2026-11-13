<script lang="ts">
	interface Star {
		x: number;
		y: number;
		delay?: number;
		duration?: number;
	}

	interface Props {
		size?: number;
		radius?: number;
		stars?: Star[];
		dotClass?: string;
		glow?: number;
		class?: string;
	}

	let {
		size = 20,
		radius = 1.5,
		stars = [
			{ x: 12, y: 18, delay: 0, duration: 6 },
			{ x: 38, y: 10, delay: 1.3, duration: 7.5 },
			{ x: 66, y: 22, delay: 2.9, duration: 5.5 },
			{ x: 88, y: 14, delay: 4.1, duration: 8 },
			{ x: 22, y: 48, delay: 0.7, duration: 6.5 },
			{ x: 52, y: 40, delay: 3.4, duration: 7 },
			{ x: 78, y: 55, delay: 5.2, duration: 6 },
			{ x: 8, y: 76, delay: 2.2, duration: 8.5 },
			{ x: 34, y: 82, delay: 4.6, duration: 7 },
			{ x: 60, y: 70, delay: 1.8, duration: 6.5 },
			{ x: 92, y: 86, delay: 3.9, duration: 7.5 }
		],
		dotClass = 'text-overlay0/60',
		glow = 8,
		class: className = ''
	}: Props = $props();

	const dots = $derived(
		`background-image: radial-gradient(circle, currentColor ${radius}px, transparent ${radius}px);
		 background-size: ${size}px ${size}px;
		 background-position: ${size / 2}px ${size / 2}px;`
	);

	const starStyle = (s: Star) =>
		`left: round(nearest, ${s.x}%, ${size}px); top: round(nearest, ${s.y}%, ${size}px);
		 width: ${radius * 2}px; height: ${radius * 2}px;
		 box-shadow: 0 0 ${glow}px ${glow / 4}px var(--color-accent);
		 --twinkle-delay: ${s.delay ?? 0}s; --twinkle-duration: ${s.duration ?? 6}s;`;
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 {className}">
	<div class="absolute inset-0 {dotClass}" style={dots}></div>

	{#each stars as star, i (i)}
		<span
			class="absolute -translate-1/2 animate-twinkle rounded-full bg-accent motion-reduce:hidden"
			style={starStyle(star)}
		></span>
	{/each}
</div>
