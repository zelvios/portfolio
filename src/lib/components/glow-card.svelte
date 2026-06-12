<script lang="ts">
  import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
  } from 'motion-sv'
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'

  interface GlowCardProps {
    children?: Snippet
    class?: string
    gradientSize?: number
    gradientColor?: string
    gradientOpacity?: number
    gradientFrom?: string
    gradientTo?: string
  }

  let {
    children,
    class: className,
    gradientSize = 200,
    gradientColor = 'var(--foreground)',
    gradientOpacity = 0.15,
    gradientFrom = 'var(--highlight)',
    gradientTo = 'var(--highlight)',
  }: GlowCardProps = $props()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  let borderGradient = $derived(
    useMotionTemplate`radial-gradient(${gradientSize}px circle at ${smoothMouseX}px ${smoothMouseY}px, ${gradientFrom}, ${gradientTo}, var(--border) 100%)`,
  )

  let overlayGradient = $derived(
    useMotionTemplate`radial-gradient(${gradientSize}px circle at ${smoothMouseX}px ${smoothMouseY}px, ${gradientColor}, transparent 100%)`,
  )

  let isHovered = $state(false)

  const handlePointerEnter = (e: PointerEvent) => {
    isHovered = true
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    smoothMouseX.set(x)
    smoothMouseY.set(y)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handlePointerMove = (e: PointerEvent) => {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handlePointerLeave = () => {
    isHovered = false
  }
</script>

<div
  class={cn(
    'group relative rounded-[inherit] overflow-hidden border border-border bg-background',
    className,
  )}
  onpointerenter={handlePointerEnter}
  onpointerleave={handlePointerLeave}
  onpointermove={handlePointerMove}
  role="presentation"
>
  <motion.div
    class="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 {isHovered
      ? 'opacity-100'
      : 'opacity-0'}"
    style={{ background: borderGradient }}
  />

  <div class="bg-background absolute inset-px rounded-[inherit]"></div>

  <motion.div
    class="pointer-events-none absolute inset-px rounded-[inherit] transition-opacity duration-300"
    style={{
      background: overlayGradient,
      opacity: isHovered ? gradientOpacity : 0,
    }}
  />

  <div class="relative z-10 text-foreground h-full">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
