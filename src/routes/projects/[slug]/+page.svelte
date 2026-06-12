<script lang="ts">
  import { LightCard } from '$lib'
  import { marked } from 'marked'

  let { data } = $props()

  let project = $derived(data.project)
  let contentHtml = $derived(marked.parse(project.content))
</script>

<svelte:head>
  <title>{project.title} | Jacob Jørgensen</title>
  <meta name="description" content={project.description} />
</svelte:head>

<div
  class="w-full min-h-dvh p-4 sm:p-8 pt-24 sm:pt-32 max-w-5xl mx-auto space-y-6 sm:space-y-8"
>
  <div class=" text-[10px] sm:text-xs opacity-50 mb-4 wrap-break-word">
    <a href="/projects" class="hover:text-highlight">~/projects</a> / {project.slug}
  </div>

  <LightCard
    class="rounded-2xl overflow-hidden"
    gradientFrom="var(--highlight)"
    gradientTo="var(--border)"
    gradientSize={300}
    gradientOpacity={0.15}
  >
    <div class="p-6 sm:p-8 md:p-12">
      <h1
        class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground pb-4 tracking-tight"
      >
        {project.title}
      </h1>

      <div
        class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6 py-5 sm:py-6 border-y border-border my-6 sm:my-8 text-[10px] sm:text-xs text-muted-foreground"
      >
        <div class="flex items-center gap-2">
          <span class="text-highlight">DATE:</span>
          <span>{project.createdAt}</span>
        </div>

        <div class="flex flex-wrap gap-2">
          {#each project.tags as tag}
            <span
              class="px-1.5 py-0.5 bg-secondary rounded-md border border-border text-[10px] uppercase tracking-wide text-secondary-foreground"
            >
              {tag}
            </span>
          {/each}
        </div>
      </div>

      <div class="prose dark:prose-invert max-w-none space-y-6">
        <p
          class="text-sm sm:text-base text-foreground leading-relaxed font-medium"
        >
          {project.description}
        </p>

        <div
          class="h-px w-full bg-linear-to-r from-border via-highlight/20 to-transparent my-8 sm:my-10"
        ></div>

        <div class="prose-terminal">
          {@html contentHtml}
        </div>
      </div>

      <div class="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
        <a
          href="/projects"
          class="text-xs hover:text-highlight transition-colors flex items-center gap-2"
        >
          <span class="text-highlight">←</span> Go Back
        </a>
      </div>
    </div>
  </LightCard>
</div>
