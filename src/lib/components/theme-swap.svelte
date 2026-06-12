<script lang="ts">
  import { onMount } from 'svelte'
  import { Moon, Sun } from '@lucide/svelte'
  import { cn } from '$lib/utils'

  interface AnimatedThemeTogglerProps {
    class?: string
    duration?: number
  }

  let {
    class: className,
    duration = 400,
    ...props
  }: AnimatedThemeTogglerProps = $props()

  // We track 'isLight' instead of 'isDark' to match your CSS structure
  let isLight = $state(false)
  let buttonRef: HTMLButtonElement | null = $state(null)

  onMount(() => {
    // Check if the document has the 'light' class
    isLight = document.documentElement.classList.contains('light')

    const observer = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains('light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  })

  const toggleTheme = async () => {
    if (!buttonRef) return

    const performToggle = () => {
      isLight = !isLight
      document.documentElement.classList.toggle('light', isLight)
      localStorage.setItem('theme', isLight ? 'light' : 'dark')
    }

    if (!document.startViewTransition) {
      performToggle()
      return
    }

    await document.startViewTransition(performToggle).ready

    const { top, left, width, height } = buttonRef.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }
</script>

<button
  bind:this={buttonRef}
  onclick={toggleTheme}
  class={cn(className)}
  {...props}
>
  {#if isLight}
    <Moon />
  {:else}
    <Sun />
  {/if}
  <span class="sr-only">Toggle theme</span>
</button>
