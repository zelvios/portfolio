<script lang="ts">
  import { DotPattern, HeroTextHover, CrossLines, HeroTerminal } from '$lib'
  import { cn } from '$lib/utils'
</script>

<svelte:head>
  <title>Jacob Jørgensen Portfolio</title>
  <meta
    name="description"
    content="Jacob Jørgensen Portfolio: Discover full-stack projects by Jacob J. View my latest programming projects from Denmark."
  />
</svelte:head>

<div
  class="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-visible text-foreground font-mono"
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

  <div
    class="pointer-events-auto absolute inset-0 z-0 flex items-center justify-center"
  >
    <div class="w-[95vw] opacity-40">
      <HeroTextHover text="Jacob" />
    </div>
  </div>

  <div
    class="absolute inset-x-0 bottom-0 h-[450px] w-full max-w-5xl px-6 mx-auto z-0 pointer-events-none translate-y-40 -scale-y-100"
  >
    <div class="relative w-full h-full">
      <CrossLines />
    </div>
  </div>

  <main
    class="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center gap-0 text-center pointer-events-none"
  >
    <div class="relative mb-8">
      <h2
        class="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white to-highlight/40"
      >
        Full-Stack Developer
      </h2>
    </div>

    <h1
      class="mt-24 mb-4 text-[clamp(0.8125rem,2vw,1rem)] font-normal tracking-[0.12em] uppercase text-muted-foreground"
    >
      Jacob Jørgensen
    </h1>

    <h3
      class="text-[clamp(0.6875rem,1.5vw,0.8125rem)] tracking-[0.08em] text-muted-foreground/50"
    >
      Based in Denmark
    </h3>
  </main>
</div>

<section
  class="min-h-[100dvh] flex flex-col items-center p-6 sm:p-10 relative z-10"
>
  <div class="w-full max-w-5xl relative min-h-[400px]">
    <div
      class="absolute -top-24 left-0 right-0 z-10 text-left pl-6 sm:pl-10 grid grid-cols-1 md:grid-cols-3 gap-12 font-mono"
    >
      <div class="md:col-span-3 flex flex-col gap-3">
        <span class="text-sm text-highlight/70 tracking-widest uppercase"
          >// 01
        </span>
        <h2
          class="text-3xl mb-8 font-extrabold tracking-tight text-white uppercase"
        >
          Core Architecture
        </h2>
        <HeroTerminal />
      </div>
    </div>
  </div>
</section>
