<script>
  import { onMount } from 'svelte'
  import { GlowCard, DotMap, Mail, GitHub } from '$lib'

  onMount(() => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' })
  })

  const markers = [
    { lat: 40.7128, lng: -74.006, size: 0.3 },
    { lat: 34.0522, lng: -118.2437, size: 0.3 },
    { lat: 51.5074, lng: -0.1278, size: 0.3 },
    { lat: -33.8688, lng: 151.2093, size: 0.3 },
    { lat: 48.8566, lng: 2.3522, size: 0.3 },
    { lat: 35.6762, lng: 139.6503, size: 0.3 },
    { lat: 55.7558, lng: 37.6176, size: 0.3 },
    { lat: 39.9042, lng: 116.4074, size: 0.3 },
    { lat: 19.076, lng: 72.8777, size: 0.3 },
    { lat: -23.5505, lng: -46.6333, size: 0.3 },
    { lat: 1.3521, lng: 103.8198, size: 0.3 },
    { lat: 25.2048, lng: 55.2708, size: 0.3 },
    { lat: 52.52, lng: 13.405, size: 0.3 },
    { lat: 19.4326, lng: -99.1332, size: 0.3 },
    { lat: -26.2041, lng: 28.0473, size: 0.3 },
    { lat: 55.6761, lng: 12.5683, size: 0.6 },
  ]

  const contacts = [
    {
      name: 'contact@jacob-j.com',
      undername: 'Email',
      icon: Mail,
      href: 'mailto:contact@jacob-j.com',
      color: '#ff7700',
      hover: {
        text: 'group-hover:text-[#ff7700]',
        border: 'group-hover:border-[#ff7700]',
        bg: 'group-hover:bg-[#ff7700]',
      },
    },
    {
      name: 'zelvios',
      undername: 'GitHub',
      icon: GitHub,
      href: 'https://github.com/zelvios',
      color: '#2effbd',
      hover: {
        text: 'group-hover:text-[#2effbd]',
        border: 'group-hover:border-[#2effbd]',
        bg: 'group-hover:bg-[#2effbd]',
      },
    },
  ]
</script>

<svelte:head>
  <title>Contact | Jacob Jørgensen</title>
  <meta
    name="description"
    content="Get in touch with Jacob Jørgensen. Reach out via email or connect on GitHub for software engineering inquiries and collaborations."
  />
</svelte:head>

<div
  class="relative h-screen w-full flex flex-col items-center justify-center bg-background overflow-hidden"
>
  <div
    class="relative min-h-screen w-full flex flex-col items-center justify-center bg-background"
  >
    <div
      class="fixed inset-0 z-0 flex items-center justify-center opacity-60 pointer-events-none"
    >
      <div class="w-full max-w-7xl aspect-2/1">
        <DotMap
          dotColor="var(--muted-foreground)"
          dotRadius={0.12}
          height={50}
          markerColor="var(--highlight)"
          {markers}
          width={100}
        />
      </div>
    </div>

    <div
      class="relative z-10 grid grid-cols-1 md:grid-cols-2 justify-center gap-6 w-full max-w-3xl px-6 py-20"
    >
      {#each contacts as item}
        {@const IconComponent = item.icon}
        <GlowCard
          gradientSize={160}
          gradientFrom={item.color}
          gradientTo={item.color}
          gradientColor={item.color}
          gradientOpacity={0.15}
          class="cursor-pointer shadow-2xl group transition-all duration-300 h-64 w-full"
        >
          <a
            href={item.href}
            class="flex w-full h-full flex-col items-center justify-center p-8 text-center text-foreground transition-colors duration-300 no-underline {item
              .hover.text}"
          >
            <div
              class="mb-4 flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-secondary transition-colors {item
                .hover.border}"
            >
              <IconComponent size={28} />
            </div>

            <div
              class="mb-4 h-8 w-px bg-border transition-colors {item.hover.bg}"
            ></div>

            <div class="flex flex-col items-center w-full">
              <span class="w-full px-2 text-center text-xl font-bold">
                {item.name}
              </span>
              <span class="mt-1 text-sm text-muted-foreground text-center">
                {item.undername}
              </span>
            </div>
          </a>
        </GlowCard>
      {/each}
    </div>
  </div>
</div>
