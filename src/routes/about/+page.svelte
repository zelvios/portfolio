<script>
  import { onMount } from 'svelte'
  import { DotPattern } from '$lib'
  import { cn } from '$lib/utils'
  import { motion } from 'motion-sv'

  const MotionH1 = motion.h1
  const MotionH2 = motion.h2
  const MotionDiv = motion.div
  const MotionP = motion.p
  const MotionUl = motion.ul
</script>

<svelte:head>
  <title>About | Jacob Jørgensen</title>
  <meta
    name="description"
    content="I'm Jacob Jørgensen, a software engineer specialized in cross-platform development, systems, and databases."
  />
</svelte:head>

<div
  class="min-h-dvh relative flex w-full flex-col items-center justify-center overflow-x-hidden bg-background px-4 py-24 sm:py-32"
  data-route="/about"
>
  <div class="w-full max-w-3xl mx-auto z-10">
    <MotionH1
      animate={{ opacity: 1, y: 0 }}
      class="text-3xl font-bold text-white text-left"
      initial={{ opacity: 0, y: 15 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      About
    </MotionH1>

    <MotionDiv
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      class="w-1/4 h-0.5 bg-linear-to-r from-border to-transparent mt-2 mb-8"
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 1.0, delay: 0.3 }}
    ></MotionDiv>

    <div
      class="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed"
    >
      <MotionH2
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        class="text-xl font-semibold text-highlight text-left tracking-tight"
        initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        I'm Jacob Jørgensen, a full-stack programmer based in Denmark.
      </MotionH2>

      <MotionP
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        Driven by a love for building things that last, I specialize in systems
        programming and data management. I don't limit myself to one specific
        platform; instead, I focus on using the right tool for the job.
      </MotionP>

      <MotionUl
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        class="space-y-3 pl-2 sm:pl-4"
        initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <li class="flex gap-3">
          <span class="text-highlight font-bold">›</span>
          <span
            ><strong class="text-foreground font-medium">Core Systems:</strong> Writing
            primarily in Rust and C# to bridge the gap between low-level performance
            and high-level architecture.</span
          >
        </li>
        <li class="flex gap-3">
          <span class="text-highlight font-bold">›</span>
          <span
            ><strong class="text-foreground font-medium"
              >Data Management:</strong
            > Designing optimized database structures with a sharp eye for edge cases
            across PostgreSQL and MSSQL.</span
          >
        </li>
        <li class="flex gap-3">
          <span class="text-highlight font-bold">›</span>
          <span
            ><strong class="text-foreground font-medium">Infrastructure:</strong
            > Working comfortably within native Linux environments and setting up
            reliable applications using Docker.</span
          >
        </li>
      </MotionUl>

      <MotionP
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        Whether I'm building an API from scratch or maintaining existing
        architecture, my ultimate goal is to make complex systems feel simple
        and reliable.
      </MotionP>
    </div>
  </div>

  <DotPattern
    class={cn(
      'absolute inset-0 opacity-30',
      'mask-[radial-gradient(350px_circle_at_center,white,transparent)] md:mask-[radial-gradient(500px_circle_at_center,white,transparent)]',
    )}
    cr={2}
    height={20}
    width={20}
  />
</div>
