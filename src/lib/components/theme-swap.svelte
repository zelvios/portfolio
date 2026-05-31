<script lang="ts">
  import { onMount } from 'svelte'
  import { Terminal, Coffee } from '@lucide/svelte'
  import { cn } from '$lib/utils'

  interface ThemeSwapProps {
    class?: string
    duration?: number
  }

  let { class: className, duration = 400, ...props }: ThemeSwapProps = $props()

  let isDimmed = $state(false)
  let buttonRef: HTMLButtonElement | null = $state(null)

  onMount(() => {
    const updateTheme = () => {
      isDimmed = document.documentElement.classList.contains('dimmed')
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  })

  const toggleTheme = async () => {
    if (!buttonRef) return

    if (!document.startViewTransition) {
      const newTheme = !isDimmed
      isDimmed = newTheme
      document.documentElement.classList.toggle('dimmed')
      localStorage.setItem('theme', newTheme ? 'dimmed' : 'default')
      return
    }

    await document.startViewTransition(() => {
      const newTheme = !isDimmed
      isDimmed = newTheme
      document.documentElement.classList.toggle('dimmed')
      localStorage.setItem('theme', newTheme ? 'dimmed' : 'default')
    }).ready

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
        fill: 'forwards',
      },
    )
  }
</script>

<button
  bind:this={buttonRef}
  onclick={toggleTheme}
  class={cn(
    className,
    'cursor-pointer rounded-full p-1 transition-all duration-300',
    'hover:scale-115 hover:rotate-6 active:scale-95',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-highlight/50',
  )}
  {...props}
>
  <span class="icon-shine block">
    {#if isDimmed}
      <Terminal class="size-5" />
    {:else}
      <Coffee class="size-5" />
    {/if}
  </span>
  <span class="sr-only">Toggle theme</span>
</button>
