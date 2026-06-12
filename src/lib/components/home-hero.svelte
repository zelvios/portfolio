<script lang="ts">
  import { FileTreeContainer, GoToButtonShine } from '$lib'

  interface Props {
    isTransitioning: boolean
    isMounted: boolean
    gradientActive: boolean
  }

  let { isTransitioning, isMounted, gradientActive }: Props = $props()
</script>

<div
  class="absolute top-[50%] left-1/2 z-10 w-full flex flex-col items-center gap-4 sm:gap-6 text-center transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 {isTransitioning
    ? '-translate-y-12 opacity-0'
    : ''}"
>
  <div
    class="relative flex flex-col items-center pt-6 pb-2 sm:pt-10 sm:pb-4 w-[90vw] sm:w-[80vw] max-w-4xl"
  >
    <div
      class="absolute top-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-top' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>

    <h1
      class="relative flex flex-col items-center justify-center w-full max-w-none px-4 min-h-[140px] sm:min-h-[200px] md:min-h-[260px] mt-2 mb-2 sm:mt-4 sm:mb-4"
    >
      <span
        class="relative z-10 inline-block px-2 font-serif text-6xl sm:text-8xl md:text-[9rem] leading-none font-extrabold tracking-tighter transition-all duration-1000 select-none md:-ml-32 text-wrap
        {isMounted ? 'animate-home-reveal' : 'opacity-0'}
        {gradientActive
          ? 'bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-sm'
          : 'text-foreground'}"
      >
        Jacob
      </span>

      <span class="sr-only"> </span>

      <span
        class="absolute top-[50%] sm:top-[60%] inline-block px-2 font-serif text-5xl sm:text-7xl md:text-[7.5rem] leading-none font-extrabold tracking-tight text-foreground/10 transition-all duration-1000 delay-100 select-none -z-10 md:ml-72 text-wrap
        {isMounted ? 'animate-home-reveal' : 'opacity-0'}"
      >
        Jørgensen
      </span>
    </h1>

    <div
      class="absolute bottom-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-bottom' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>
  </div>

  <div
    class="flex w-full flex-col items-center gap-6 md:flex-row md:justify-center md:gap-16 lg:gap-24"
  >
    <div
      class="flex shrink-0 justify-center transition-all duration-1000
      {isTransitioning
        ? 'opacity-0 translate-y-4 delay-0 pointer-events-none'
        : gradientActive
          ? 'opacity-100 translate-y-0 delay-300'
          : 'opacity-0 translate-y-4 delay-500'}"
    >
      <FileTreeContainer />
    </div>

    <div
      class="flex w-full max-w-sm flex-col items-center justify-center text-center transition-all duration-1000 md:items-start md:text-left
      {isTransitioning
        ? 'opacity-0 translate-y-4 delay-0 pointer-events-none'
        : gradientActive
          ? 'opacity-100 translate-y-0 delay-500'
          : 'opacity-0 translate-y-4 delay-500'}"
    >
      <h2 class="mb-2 sm:mb-4 text-2xl font-bold text-foreground">
        Fullstack Developer
      </h2>

      <p class="mb-6 sm:mb-10 leading-relaxed text-muted-foreground">
        Navigate through the file structure to explore the pages of my
        portfolio.
      </p>

      <GoToButtonShine href="/projects" text="Go To Projects" />
    </div>
  </div>
</div>
