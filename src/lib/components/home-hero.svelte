<script lang="ts">
  import { ThemeSwap } from '../index'

  interface Props {
    isTransitioning: boolean
    isMounted: boolean
    gradientActive: boolean
  }

  let { isTransitioning, isMounted, gradientActive }: Props = $props()
</script>

<div
  class="absolute top-1/2 left-1/2 z-10 w-full flex flex-col items-center gap-2 text-center transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 {isTransitioning
    ? '-translate-y-12 opacity-0'
    : ''}"
>
  <div
    class="relative flex flex-col items-center py-6 w-[90vw] sm:w-[80vw] max-w-lg"
  >
    <div
      class="absolute top-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-top' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>

    <div
      class="relative inline-flex text-3xl sm:text-4xl font-bold tracking-tight h-12 items-center justify-center"
    >
      <span
        class="whitespace-nowrap font-bold transition-all duration-1000 select-none {isMounted
          ? 'animate-home-reveal'
          : 'opacity-0'}
        {gradientActive
          ? 'bg-gradient-to-br from-white via-white to-highlight bg-clip-text text-transparent'
          : 'text-white'}"
      >
        Jacob Jørgensen
      </span>

      <ThemeSwap
        class="absolute -top-3 -right-3 sm:-top-2.5 sm:-right-6 size-5 flex items-center justify-center transition-all duration-1000 {gradientActive
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-75'}"
      />
    </div>

    <div
      class="absolute bottom-0 h-px w-full bg-white transition-opacity duration-1000 mask-[linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]
      {isMounted ? 'animate-line-reveal-bottom' : 'opacity-0'} {gradientActive
        ? 'opacity-0'
        : 'opacity-15'}"
    ></div>
  </div>

  <div
    class="text-foreground text-base sm:text-lg px-4 space-y-1 sm:space-y-1 leading-snug tracking-tight text-balance transition-all duration-1000 delay-200
    {gradientActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}"
  >
    <p>Interested in memory safety, concurrency, and system design.</p>
    <p
      class="text-sm sm:text-lg mt-1 sm:mt-0 text-muted-foreground sm:text-foreground"
    >
      - Programmer based in Denmark -
    </p>
  </div>
</div>
