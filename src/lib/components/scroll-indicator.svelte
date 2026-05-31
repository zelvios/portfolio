<script lang="ts">
  import { cn } from '$lib/utils'

  interface Props {
    class?: string
    progress?: number
  }

  let { class: className, progress = 0 }: Props = $props()
</script>

<div
  class={cn(
    'flex flex-col items-center gap-2 text-muted-foreground',
    className,
  )}
>
  <span
    class="text-xs uppercase tracking-widest font-medium bg-clip-text text-transparent select-none transition-all duration-75"
    style="background-image: linear-gradient(to right, var(--highlight) {progress}%, var(--muted-foreground) {progress}%);"
  >
    Scroll
  </span>

  <div class="relative h-16 w-px bg-muted-foreground/20 overflow-hidden">
    <div
      class="absolute inset-x-0 top-0 h-1/2 bg-highlight animate-scroll-down"
      style="--tw-keyframes-scroll-down-100: translateY(100%);"
    ></div>
  </div>
</div>
