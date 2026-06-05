<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { DotPattern, ScrollIndicator, HomeHero } from '$lib'
  import { cn } from '$lib/utils'

  let isTransitioning = $state(false)
  let isMounted = $state(false)
  let gradientActive = $state(false)

  let windowWidth = $state(0)
  let windowHeight = $state(0)

  let hasEnoughHeight = $derived(
    windowWidth >= 768 ? windowHeight > 650 : windowHeight > 860,
  )

  let accumulatedScroll = $state(0)
  let scrollResetTimeout: ReturnType<typeof setTimeout>

  const scrollProgress = $derived(
    Math.min((accumulatedScroll / 300) * 100, 100),
  )

  onMount(() => {
    isMounted = true

    const timer = setTimeout(() => {
      gradientActive = true
    }, 900)

    return () => clearTimeout(timer)
  })

  function triggerNavigation() {
    isTransitioning = true
    accumulatedScroll = 300

    setTimeout(() => {
      goto('/projects')
    }, 500)
  }

  function handleWheel(e: WheelEvent) {
    if (isTransitioning || !gradientActive) return

    clearTimeout(scrollResetTimeout)

    if (e.deltaY > 0) {
      accumulatedScroll += e.deltaY

      if (accumulatedScroll >= 300) {
        triggerNavigation()
      }
    } else {
      accumulatedScroll = 0
    }

    scrollResetTimeout = setTimeout(() => {
      if (!isTransitioning) {
        accumulatedScroll = 0
      }
    }, 150)
  }

  let touchStartY = 0

  function handleTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY
  }

  function handleTouchEnd(e: TouchEvent) {
    if (isTransitioning || !gradientActive) return
    const touchEndY = e.changedTouches[0].clientY

    if (touchStartY - touchEndY > 150) {
      triggerNavigation()
    }
  }
</script>

<svelte:head>
  <title>Home | Jacob Jørgensen Portfolio</title>
  <meta
    name="description"
    content="Jacob J | Explore the programmer portfolio of Jacob Jørgensen. Discover full-stack projects built in Denmark."
  />
</svelte:head>

<svelte:window
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
  ontouchend={handleTouchEnd}
  ontouchstart={handleTouchStart}
  onwheel={handleWheel}
/>

<div
  class="min-h-dvh relative flex w-full flex-col items-center justify-center overflow-hidden bg-background px-4"
  data-route="/"
>
  <HomeHero {gradientActive} {isMounted} {isTransitioning} />

  <ScrollIndicator
    class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000
    {isTransitioning
      ? 'opacity-0 translate-y-8 delay-0 pointer-events-none'
      : gradientActive && hasEnoughHeight
        ? 'opacity-100 translate-y-0 delay-700'
        : 'opacity-0 translate-y-6 delay-700 pointer-events-none'}"
    progress={scrollProgress}
  />

  <div
    class="transition-opacity duration-1000
    {isTransitioning
      ? 'opacity-0 delay-0 pointer-events-none'
      : gradientActive
        ? 'opacity-100 delay-300'
        : 'opacity-0 delay-300'}"
  >
    <DotPattern
      class={cn(
        'absolute inset-0 opacity-30',
        'mask-[radial-gradient(350px_circle_at_center,white,transparent)] md:mask-[radial-gradient(500px_circle_at_center,white,transparent)]',
      )}
      cr={2}
      height={20}
      width={20}
    />
  </div>
</div>
