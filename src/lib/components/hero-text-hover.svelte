<script lang="ts">
  let { text = '' } = $props()

  const uid = Math.random().toString(36).slice(2, 8)

  let svgRef: SVGSVGElement | null = $state(null)
  let hovered = $state(false)
  let cursor = $state({ x: 0, y: 0 })

  let maskPosition = $derived.by(() => {
    if (!svgRef) return { cx: '50%', cy: '50%' }
    const rect = svgRef.getBoundingClientRect()
    return {
      cx: `${((cursor.x - rect.left) / rect.width) * 100}%`,
      cy: `${((cursor.y - rect.top) / rect.height) * 100}%`,
    }
  })
</script>

<svg
  bind:this={svgRef}
  width="100%"
  height="100%"
  viewBox="0 0 300 100"
  class="select-none cursor-crosshair"
  role="img"
  aria-label="Interactive text effect: {text}"
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  onmousemove={(e) => (cursor = { x: e.clientX, y: e.clientY })}
>
  <defs>
    <linearGradient id="textGradient-{uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="var(--foreground)" />
      <stop offset="100%" stop-color="var(--highlight)" />
    </linearGradient>

    <radialGradient
      id="revealMask-{uid}"
      r="20%"
      cy={maskPosition.cy}
      cx={maskPosition.cx}
    >
      <stop offset="0%" stop-color="white" />
      <stop offset="100%" stop-color="black" />
    </radialGradient>

    <filter id="glow-{uid}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <mask id="textMask-{uid}">
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#revealMask-{uid})"
      />
    </mask>
  </defs>

  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    stroke-width="0.3"
    class="font-mono font-bold fill-transparent stroke-neutral-700 text-3xl"
    >{text}</text
  >

  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    stroke="var(--highlight)"
    stroke-width="1.5"
    filter="url(#glow-{uid})"
    mask="url(#textMask-{uid})"
    class="font-mono font-bold fill-transparent text-3xl transition-opacity duration-300"
    style:opacity={hovered ? 0.4 : 0}>{text}</text
  >

  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    stroke="url(#textGradient-{uid})"
    stroke-width="0.3"
    mask="url(#textMask-{uid})"
    class="font-mono font-bold fill-transparent text-3xl transition-opacity duration-300"
    style:opacity={hovered ? 1 : 0}>{text}</text
  >
</svg>
