<script lang="ts">
  import { motion } from 'motion-sv'
  import { cn } from '$lib/utils'
  import type { SVGAttributes } from 'svelte/elements'

  const MotionCircle = motion.circle

  interface DotPatternProps extends SVGAttributes<SVGSVGElement> {
    width?: number
    height?: number
    x?: number
    y?: number
    cx?: number
    cy?: number
    cr?: number
    class?: string
    glow?: boolean
  }

  let {
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    class: className,
    glow = false,
    ...props
  }: DotPatternProps = $props()

  const id = $props.id()
  let containerRef = $state<SVGSVGElement | null>(null)
  let dimensions = $state({ width: 0, height: 0 })

  $effect(() => {
    if (!glow) return

    const updateDimensions = () => {
      if (containerRef) {
        const rect = containerRef.getBoundingClientRect()
        dimensions = { width: rect.width, height: rect.height }
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  })

  const dots = $derived(
    glow && dimensions.width > 0 && dimensions.height > 0
      ? Array.from(
          {
            length:
              Math.ceil(dimensions.width / width) *
              Math.ceil(dimensions.height / height),
          },
          (_, i) => {
            const cols = Math.ceil(dimensions.width / width)
            const col = i % cols
            const row = Math.floor(i / cols)
            return {
              x: col * width + cx,
              y: row * height + cy,
              delay: Math.random() * 5,
              duration: Math.random() * 3 + 2,
            }
          },
        )
      : [],
  )
</script>

<svg
  {...props}
  aria-hidden="true"
  bind:this={containerRef}
  class={cn(
    'pointer-events-none absolute inset-0 h-full w-full text-neutral-400',
    className,
  )}
>
  {#if glow}
    <defs>
      <radialGradient id={`${id}-gradient`}>
        <stop offset="0%" stop-color="currentColor" stop-opacity="1" />
        <stop offset="100%" stop-color="currentColor" stop-opacity="0" />
      </radialGradient>
    </defs>
    {#each dots as dot (dot.x + '-' + dot.y)}
      <MotionCircle
        cx={dot.x}
        cy={dot.y}
        r={cr}
        fill="url(#{id}-gradient)"
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: dot.duration,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: dot.delay,
          ease: 'easeInOut',
        }}
      />
    {/each}
  {:else}
    <defs>
      <pattern
        {height}
        {id}
        patternContentUnits="userSpaceOnUse"
        patternUnits="userSpaceOnUse"
        {width}
        {x}
        {y}
      >
        <circle {cx} {cy} fill="currentColor" r={cr} />
      </pattern>
    </defs>
    <rect fill="url(#{id})" height="100%" stroke-width="0" width="100%" />
  {/if}
</svg>
