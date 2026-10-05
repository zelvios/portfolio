<script lang="ts">
	interface Beam {
		/** 'x' runs along a row, 'y' down a column */
		axis: 'x' | 'y';
		/** row or column index the beam travels on */
		at: number;
		delay?: number;
		duration?: number;
	}

	interface Props {
		size?: number;
		radius?: number;
		beams?: Beam[];
		class?: string;
	}

	let {
		size = 20,
		radius = 1.5,
		beams = [
			{ axis: 'x', at: 6, delay: 0, duration: 7 },
			{ axis: 'y', at: 14, delay: 2.5, duration: 8 },
			{ axis: 'x', at: 15, delay: 4, duration: 6 },
			{ axis: 'y', at: 30, delay: 6.5, duration: 7.5 }
		],
		class: className = ''
	}: Props = $props();

	const dots = $derived(
		`background-image: radial-gradient(circle, currentColor ${radius}px, transparent ${radius}px);
		 background-size: ${size}px ${size}px;
		 background-position: ${size / 2}px ${size / 2}px;`
	);

	const beamStyle = (b: Beam) => {
		const horizontal = b.axis === 'x';
		const gradient = horizontal
			? 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)'
			: 'linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)';
		const maskSize = horizontal ? `320px ${size}px` : `${size}px 320px`;
		return `${dots}
			mask-image: ${gradient}; mask-size: ${maskSize}; mask-repeat: no-repeat;
			--beam-at: ${b.at * size}px; --beam-delay: ${b.delay ?? 0}s; --beam-duration: ${b.duration ?? 7}s;`;
	};
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 {className}">
	<!-- base dots -->
	<div class="absolute inset-0 text-overlay0/60" style={dots}></div>

	{#each beams as beam, i (i)}
		{@const anim = beam.axis === 'x' ? 'animate-beam-x' : 'animate-beam-y'}
		<div
			class="absolute inset-0 text-accent blur-[8px] motion-reduce:hidden {anim}"
			style={beamStyle(beam)}
		></div>
		<div
			class="absolute inset-0 text-accent blur-[3px] motion-reduce:hidden {anim}"
			style={beamStyle(beam)}
		></div>
		<div
			class="absolute inset-0 text-accent-bright motion-reduce:hidden {anim}"
			style={beamStyle(beam)}
		></div>
	{/each}
</div>
