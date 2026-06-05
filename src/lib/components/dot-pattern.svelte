<script lang="ts">
  import { cn } from '$lib/utils'
  import type { SVGAttributes } from 'svelte/elements'

  interface DotPatternProps extends SVGAttributes<SVGSVGElement> {
    width?: number
    height?: number
    x?: number
    y?: number
    cx?: number
    cy?: number
    cr?: number
    class?: string
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
    ...props
  }: DotPatternProps = $props()

  const id = $props.id()
</script>

<svg
  {...props}
  aria-hidden="true"
  class={cn(
    'pointer-events-none absolute inset-0 h-full w-full text-neutral-400',
    className,
  )}
>
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
</svg>
