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
  class="absolute top-[50%] left-1/2 z-10 w-full flex flex-col items-center gap-12 text-center transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 {isTransitioning
    ? '-translate-y-12 opacity-0'
    : ''}"
>
  <div
    class="relative flex flex-col items-center py-10 w-[90vw] sm:w-[80vw] max-w-4xl"
  >
    <div
      class="absolute top-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-top' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>

    <div
      class="relative flex flex-col items-center justify-center w-full min-h-[200px] sm:min-h-[260px] my-4 mb-12"
    >
      <span
        class="relative z-10 font-serif text-7xl sm:text-8xl md:text-[9rem] leading-none font-extrabold tracking-tighter transition-all duration-1000 select-none sm:-ml-32
        {isMounted ? 'animate-home-reveal' : 'opacity-0'}
        {gradientActive
          ? 'bg-gradient-to-br from-white via-white to-neutral-500 bg-clip-text text-transparent drop-shadow-sm'
          : 'text-white'}"
      >
        Jacob
      </span>

      <span
        class="absolute top-[50%] sm:top-[60%] font-serif text-6xl sm:text-7xl md:text-[7.5rem] leading-none font-extrabold tracking-tight text-foreground/10 transition-all duration-1000 delay-100 select-none -z-10 sm:ml-56 md:ml-72
        {isMounted ? 'animate-home-reveal' : 'opacity-0'}"
      >
        Jørgensen
      </span>
    </div>

    <div
      class="absolute bottom-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-bottom' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>
  </div>

  <div class="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
    <div
      class="flex justify-center md:justify-end transition-all duration-1000
      {isTransitioning
        ? 'opacity-0 translate-y-4 delay-0 pointer-events-none'
        : gradientActive
          ? 'opacity-100 translate-y-0 delay-300'
          : 'opacity-0 translate-y-4 delay-500'}"
    >
      <FileTreeContainer />
    </div>

    <div
      class="flex flex-col items-center justify-center text-center md:items-start md:text-left transition-all duration-1000
      {isTransitioning
        ? 'opacity-0 translate-y-4 delay-0 pointer-events-none'
        : gradientActive
          ? 'opacity-100 translate-y-0 delay-500'
          : 'opacity-0 translate-y-4 delay-500'}"
    >
      <h3 class="mb-4 text-2xl font-bold text-white">Fullstack Developer</h3>
      <p class="mb-12 text-muted-foreground leading-relaxed max-w-md">
        Navigate through the file structure to explore the foundation of my
        projects.
      </p>

      <GoToButtonShine href="/projects" text="Go To Projects" />
    </div>
  </div>
</div>
