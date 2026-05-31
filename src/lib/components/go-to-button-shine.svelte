<script lang="ts">
  interface Props {
    href: string
    text: string
  }

  let { href, text }: Props = $props()
</script>

<a
  class="cursor-pointer group relative flex h-12.5 w-45 items-center justify-center rounded-[8px] bg-white/5 p-0 outline-none transition-transform active:scale-95 no-underline"
  {href}
>
  <div
    class="pointer-events-none absolute inset-0 rounded-[8px] opacity-100 blur-[15px] transition-opacity duration-1200 group-hover:opacity-0
    bg-[radial-gradient(45%_60%_at_50%_100%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0)_70%)]"
  ></div>

  <div
    class="pointer-events-none absolute inset-0 rounded-[8px] opacity-0 blur-[18px] transition-opacity duration-1200 group-hover:opacity-100
    bg-[radial-gradient(60.6%_50%_at_50%_100%,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]"
  ></div>

  <div
    class="pointer-events-none absolute inset-0 rounded-[8px] opacity-100 transition-opacity duration-1200 group-hover:opacity-0
    bg-[radial-gradient(10.7%_50%_at_50%_100%,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]"
  ></div>

  <div
    class="pointer-events-none absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-1200 group-hover:opacity-100
    bg-[radial-gradient(60.1%_50%_at_50%_100%,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)]"
  ></div>

  <div class="absolute inset-px z-10 rounded-[7px] bg-black"></div>

  <div class="relative z-20 flex items-center justify-center">
    <p class="m-0 text-[15px] font-medium tracking-wide text-white">{text}</p>
  </div>
</a>
