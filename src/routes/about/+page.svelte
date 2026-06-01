<script>
  import { onMount } from 'svelte'
  import { LightCard, WritingAnimation } from '$lib'
  import { motion } from 'motion-sv'

  onMount(() => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' })
  })
</script>

<svelte:head>
  <title>About | Jacob Jørgensen</title>
  <meta
    name="description"
    content="I'm Jacob Jørgensen, a software engineer specialized in cross-platform development, systems, and databases."
  />
</svelte:head>

<div
  data-route="/about"
  class="snap-start min-h-dvh w-full flex flex-col items-center justify-center p-4 sm:p-8 relative py-16"
>
  <div
    class="relative w-full max-w-3xl flex flex-col items-center justify-center"
  >
    <LightCard
      class="about-card w-full max-w-3xl rounded-2xl shadow-2xl"
      gradientFrom="var(--color-highlight)"
      gradientTo="var(--border)"
      gradientSize={180}
      gradientOpacity={0.35}
    >
      <div class="p-8 sm:p-12 md:p-16 flex flex-col items-start text-left">
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          class="text-3xl font-bold bg-linear-to-r from-white to-highlight bg-clip-text text-transparent pb-1 tracking-tight"
        >
          About
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.5 }}
          class="w-1/4 h-0.5 bg-linear-to-r from-border to-transparent mt-2 mb-6"
        ></motion.div>

        <div
          class="space-y-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            I'm a programmer who enjoys building things across the entire stack.
            I don't limit myself to one specific platform, I like jumping into
            whatever tool gets the job done right.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            Most of my time is spent writing <span
              class="text-foreground font-semibold">Rust</span
            >
            and <span class="text-foreground font-semibold">C#</span>. I handle
            my own infrastructure using
            <span class="text-foreground font-semibold">Docker</span>, work
            comfortably within native
            <span class="text-foreground font-semibold">Linux</span>
            environments, and you can check out some of my work over in
            <a
              href="/projects"
              class="text-highlight hover:text-highlight/80 font-medium inline-flex items-center gap-0.5 group transition-colors"
            >
              projects <span
                class="inline-block transform group-hover:translate-x-0.5 transition-transform"
                >→</span
              ></a
            >.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          class="w-full max-w-xl mt-10 pt-8 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left text-sm"
        >
          <div class="flex flex-col h-full">
            <h3
              class="text-xs font-bold uppercase tracking-wider text-highlight flex items-center gap-1 mb-3"
            >
              <span>//</span>
              <WritingAnimation
                content="App Architecture"
                duration={120}
                delay={1400}
                showCursor={true}
                blinkCursor={true}
              />
            </h3>
            <p class="text-muted-foreground leading-normal grow mb-4">
              I build software for multiple platforms, including desktop
              applications using <span class="text-foreground font-medium"
                >Tauri</span
              >
              and mobile apps with native
              <span class="text-foreground font-medium">Kotlin</span> for Android.
            </p>
            <div
              class="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto"
            >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >Tauri</span
              >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >Android (Kotlin)</span
              >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >Docker</span
              >
            </div>
          </div>

          <div class="flex flex-col h-full">
            <h3
              class="text-xs font-bold uppercase tracking-wider text-highlight flex items-center gap-1 mb-3"
            >
              <span>//</span>
              <WritingAnimation
                content="Storage & Systems"
                duration={120}
                delay={1700}
                showCursor={true}
                blinkCursor={true}
              />
            </h3>
            <p class="text-muted-foreground leading-normal grow mb-4">
              I have worked with a variety of relational database engines,
              writing schemas and managing data structures across both <span
                class="text-foreground font-medium">PostgreSQL</span
              >
              and <span class="text-foreground font-medium">MSSQL</span>.
            </p>
            <div
              class="flex flex-wrap gap-2 text-xs text-muted-foreground mt-auto"
            >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >PostgreSQL</span
              >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >MSSQL</span
              >
              <span class="px-2 py-0.5 bg-muted rounded border border-border"
                >Linux</span
              >
            </div>
          </div>
        </motion.div>
      </div>
    </LightCard>
  </div>
</div>
