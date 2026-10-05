<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();

	const checks = [
		{ x: 95, label: 'PR checks' },
		{ x: 175, label: 'CI' },
		{ x: 255, label: 'E2E' }
	];
</script>

<svg
	viewBox="0 10 400 140"
	class="w-full text-subtext0 {className}"
	role="img"
	aria-labelledby="gitflow-title"
>
	<title id="gitflow-title"
		>Git workflow: feature branch, PR checks, CI, E2E, rebase onto main, deploy</title
	>

	<!-- lanes -->
	<g fill="none" stroke-width="2" stroke-linecap="round">
		<path d="M20 40H380" class="stroke-surface1" />
		<!-- feature branch off main -->
		<path d="M70 40c15 0 15 45 30 45H250" class="flow stroke-accent" />
		<!-- rebase: branch commits replayed onto main -->
		<path d="M250 85c15 0 15-45 30-45" class="flow stroke-accent" style="stroke-dasharray: 3 4" />
	</g>

	<!-- commits on main -->
	<g class="fill-base stroke-subtext1" stroke-width="2">
		<circle cx="40" cy="40" r="5" />
		<circle cx="70" cy="40" r="5" />
	</g>
	<!-- commits on the branch -->
	<g class="fill-base stroke-accent" stroke-width="2">
		<circle cx="130" cy="85" r="5" />
		<circle cx="180" cy="85" r="5" />
		<circle cx="230" cy="85" r="5" />
	</g>
	<!-- the same commits after rebase, now on main -->
	<g class="fill-accent stroke-accent" stroke-width="2">
		<circle cx="300" cy="40" r="5" />
		<circle cx="320" cy="40" r="5" />
		<circle cx="340" cy="40" r="5" />
	</g>

	<!-- deploy -->
	<circle cx="372" cy="40" r="7" class="fill-green" />
	<path
		d="M368.5 40l2.5 2.5 4.5-5"
		fill="none"
		class="stroke-crust"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>

	<!-- checks that gate the PR -->
	{#each checks as check (check.label)}
		<g transform="translate({check.x} 108)">
			<rect
				x="0"
				y="0"
				width="70"
				height="18"
				rx="4"
				class="fill-mantle stroke-surface1"
				stroke-width="1"
			/>
			<text x="9" y="12.5" font-size="9" font-weight="700" class="fill-green">✓</text>
			<text x="20" y="12.5" font-size="9" font-weight="700" class="fill-text">{check.label}</text>
		</g>
	{/each}

	<!-- labels -->
	<g font-size="10" font-weight="700">
		<text x="20" y="28" class="fill-subtext0">main</text>
		<text x="105" y="74" class="fill-accent">feature/*</text>
		<text x="282" y="66" class="fill-subtext0" font-weight="500">rebase</text>
		<text x="372" y="24" text-anchor="middle" class="fill-green">deploy</text>
	</g>
</svg>

<style>
	.flow {
		stroke-dasharray: 6 6;
		animation: flow 1.6s linear infinite;
	}
	@keyframes flow {
		to {
			stroke-dashoffset: -24;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.flow {
			animation: none;
		}
	}
</style>
