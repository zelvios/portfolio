<script>
  import { page } from '$app/state'
  import { ArrowLeft, Menu, X } from '@lucide/svelte'
  import ThemeSwap from './theme-swap.svelte'

  const links = [
    { name: 'projects', href: '/projects' },
    { name: 'about', href: '/about' },
    { name: 'contact', href: '/contact' },
  ]

  let currentPath = $derived(
    page.url.pathname.endsWith('/') && page.url.pathname !== '/'
      ? page.url.pathname.slice(0, -1)
      : page.url.pathname,
  )

  let backLink = $derived.by(() => {
    const path = page.url.pathname

    const isProjectIndex =
      path.split('/').filter(Boolean).length === 1 && path.includes('projects')

    if (isProjectIndex) {
      return '/'
    }

    if (path.includes('/projects/')) {
      return '/projects'
    }

    return '/'
  })

  let isMenuOpen = $state(false)
</script>

{#if currentPath !== '/'}
  <header class="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 pointer-events-none">
    <div class="mx-auto flex max-w-7xl items-center justify-between relative">
      <a
        href={backLink}
        class="pointer-events-auto p-2 hover:text-highlight transition-colors"
      >
        <ArrowLeft size={24} />
      </a>

      <nav class="hidden md:flex gap-8 items-center pointer-events-auto">
        {#each links as link}
          <a
            href={link.href}
            class="text-sm font-bold transition-colors duration-300 {currentPath ===
            link.href
              ? 'text-highlight'
              : 'text-neutral-400 hover:text-highlight'}"
          >
            /{link.name}
          </a>
        {/each}

        <div class="ml-2">
          <ThemeSwap
            class="size-5 flex items-center justify-center transition-all duration-1000"
          />
        </div>
      </nav>

      <button
        class="md:hidden pointer-events-auto p-2 text-neutral-400 hover:text-highlight transition-colors"
        onclick={() => (isMenuOpen = !isMenuOpen)}
        aria-label="Toggle menu"
      >
        {#if isMenuOpen}
          <X size={24} />
        {:else}
          <Menu size={24} />
        {/if}
      </button>

      {#if isMenuOpen}
        <div
          class="absolute top-14 right-0 w-48 bg-background/95 backdrop-blur-md border border-border/40 rounded-2xl shadow-2xl p-5 flex flex-col gap-5 pointer-events-auto md:hidden"
        >
          {#each links as link}
            <a
              href={link.href}
              onclick={() => (isMenuOpen = false)}
              class="text-sm font-bold transition-colors duration-300 {currentPath ===
              link.href
                ? 'text-highlight'
                : 'text-neutral-400 hover:text-highlight'}"
            >
              /{link.name}
            </a>
          {/each}

          <div
            class="pt-4 border-t border-border/40 flex items-center justify-between"
          >
            <span
              class="text-xs font-bold text-neutral-500 uppercase tracking-wider"
              >Theme</span
            >
            <ThemeSwap class="size-5 flex items-center justify-center" />
          </div>
        </div>
      {/if}
    </div>
  </header>
{/if}
