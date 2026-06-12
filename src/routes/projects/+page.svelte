<script lang="ts">
  import { LightCard, WritingAnimation } from '$lib'
  import { motion } from 'motion-sv'

  let { data } = $props()
  let projects = $derived(data.projects)

  const MotionH1 = motion.h1
  const MotionDiv = motion.div
  const MotionSpan = motion.span

  let step1Done = $state(false)
</script>

<svelte:head>
  <title>Projects | Jacob Jørgensen</title>
  <meta
    content="Explore software projects by Jacob Jørgensen. I build efficient, reliable tools designed to solve real-world challenges through clean system design."
    name="description"
  />
</svelte:head>

<div
  class="w-full min-h-dvh p-4 sm:p-8 pt-24 sm:pt-32 mt-8 sm:mt-32 max-w-5xl mx-auto"
>
  <MotionH1
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    class="text-3xl font-bold text-foreground text-left"
    initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
    transition={{ duration: 1.2, delay: 0.2 }}
  >
    Projects
  </MotionH1>

  <MotionDiv
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    class="w-1/4 h-0.5 bg-linear-to-r from-border to-transparent mt-2 mb-6"
    initial={{ opacity: 0, filter: 'blur(8px)' }}
    transition={{ duration: 1.0, delay: 0.3 }}
  ></MotionDiv>

  <p
    class="max-w-2xl mb-12 text-sm sm:text-base text-muted-foreground leading-normal min-h-12"
  >
    <WritingAnimation
      class="leading-normal inline"
      content="> This page showcases a selection of my projects. If you are interested in seeing more of my work, please go to "
      cursorStyle="line"
      delay={500}
      duration={25}
      onComplete={() => (step1Done = true)}
      showCursor={!step1Done}
    />

    {#if step1Done}
      <MotionSpan
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        class="inline"
      >
        <a
          href="/contact"
          class="text-highlight hover:text-highlight/80 font-medium inline-flex items-center gap-0.5 transition-colors group"
          >Contact <span
            class="inline-block transform group-hover:translate-x-0.5 transition-transform"
            >→</span
          ></a
        >
      </MotionSpan>
    {:else}
      <span class="invisible inline">Contact →</span>
    {/if}
  </p>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
  >
    {#each projects as project, i}
      <a
        href="/projects/{project.slug}"
        class="block group {i % 3 === 0
          ? 'lg:col-span-7 lg:row-span-2'
          : 'lg:col-span-5'}"
      >
        <LightCard
          class="h-full rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          gradientFrom="var(--highlight)"
          gradientTo="var(--border)"
          gradientSize={200}
          gradientOpacity={0.2}
        >
          <div class="p-5 sm:p-6 relative z-10 flex flex-col h-full">
            <div
              class="mb-4 text-[10px] text-muted-foreground uppercase tracking-wide"
            >
              Posted: {project.createdAt}
            </div>

            <h2
              class="text-lg sm:text-xl font-bold mb-2 text-foreground transition-all duration-300"
            >
              {project.title}
            </h2>

            <p class="text-muted-foreground text-sm leading-relaxed mb-6 grow">
              {project.description}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              {#each project.tags as tag}
                <span
                  class="px-1.5 py-0.5 bg-secondary rounded-md border border-border text-[10px] uppercase tracking-wide text-secondary-foreground"
                >
                  {tag}
                </span>
              {/each}
            </div>

            <div class="text-sm font-semibold text-highlight mt-auto">
              Read More →
            </div>
          </div>
        </LightCard>
      </a>
    {/each}
  </div>
</div>
