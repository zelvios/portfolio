<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { goto } from '$app/navigation'

  type Line =
    | { kind: 'cmd'; text: string; visible: boolean }
    | { kind: 'out'; text: string; visible: boolean; accent?: boolean }
    | { kind: 'gap'; visible: boolean }

  let committed: Line[] = $state([])
  let activeCmd: string = $state('')
  let cursorOn: boolean = $state(true)
  // After animation: terminal accepts user input
  let interactive: boolean = $state(false)
  let userInput: string = $state('')
  let inputEl: HTMLInputElement | null = $state(null)

  // Keep bottom pinned while user types
  $effect(() => {
    if (userInput !== undefined) scrollToBottom()
  })

  const SCRIPT = [
    { kind: 'cmd' as const, text: 'jacob --stack' },
    { kind: 'gap' as const },
    { kind: 'out' as const, text: 'rust' },
    { kind: 'out' as const, text: 'csharp' },
    { kind: 'out' as const, text: 'svelte' },
    { kind: 'gap' as const },
    { kind: 'out' as const, text: '→  systems, performance, memory safety' },
    { kind: 'out' as const, text: '→  .NET, ASP.NET Core, APIs' },
    { kind: 'out' as const, text: '→  UI, SvelteKit, components' },
    { kind: 'gap' as const },
    { kind: 'cmd' as const, text: 'jacob --projects' },
    { kind: 'gap' as const },
  ]

  const CMD_CHAR_DELAY = 48
  const LINE_PAUSE = 160
  const BLINK_RATE = 520

  let bodyEl: HTMLElement
  let wrapEl: HTMLElement

  async function scrollToBottom() {
    await tick()
    if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight
  }

  function pushLine(line: Line) {
    committed = [...committed, line]
  }

  async function showLine(
    line: { kind: 'out'; text: string; accent?: boolean },
    pause: number,
    wait: (ms: number) => Promise<void>,
  ) {
    pushLine({ ...line, visible: false } as Line)
    await wait(30)
    const i = committed.length - 1
    committed = committed.map((l, idx) =>
      idx === i ? { ...l, visible: true } : l,
    )
    await scrollToBottom()
    await wait(pause)
  }

  const YES_CMDS = new Set(['yes', 'y', 'ye', 'ja'])

  async function handleUserSubmit() {
    const raw = userInput.trim()
    const input = raw.toLowerCase()
    userInput = ''

    pushLine({ kind: 'cmd', text: raw, visible: true })
    await scrollToBottom()

    if (YES_CMDS.has(input)) {
      pushLine({ kind: 'gap', visible: true })
      pushLine({
        kind: 'out',
        text: 'redirecting to /projects...',
        visible: true,
        accent: true,
      })
      await scrollToBottom()
      setTimeout(() => goto('/projects'), 600)
    } else if (input === '') {
      // do nothing for empty
    } else {
      pushLine({ kind: 'gap', visible: true })
      pushLine({ kind: 'out', text: `unknown command: ${raw}`, visible: true })
      await scrollToBottom()
    }
  }

  onMount(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

    async function animate() {
      for (const step of SCRIPT) {
        if (cancelled) return

        if (step.kind === 'gap') {
          pushLine({ kind: 'gap', visible: false })
          await wait(20)
          const i = committed.length - 1
          committed = committed.map((l, idx) =>
            idx === i ? { ...l, visible: true } : l,
          )
          await scrollToBottom()
          await wait(LINE_PAUSE * 0.4)
          continue
        }

        if (step.kind === 'out') {
          await showLine(step, LINE_PAUSE * 0.85, wait)
          continue
        }

        // cmd — type into the live cursor row
        activeCmd = ''
        for (let c = 0; c <= step.text.length; c++) {
          if (cancelled) return
          activeCmd = step.text.slice(0, c)
          await scrollToBottom()
          if (c < step.text.length) await wait(CMD_CHAR_DELAY)
        }
        await wait(LINE_PAUSE * 1.6)

        pushLine({ kind: 'cmd', text: step.text, visible: true })
        activeCmd = ''
        await scrollToBottom()
        await wait(LINE_PAUSE * 0.3)
      }

      // Animation done — show the interactive prompt question
      await wait(LINE_PAUSE * 2)
      await showLine(
        { kind: 'out', text: 'wanna explore some of the projects?' },
        LINE_PAUSE,
        wait,
      )
      await showLine(
        { kind: 'out', text: '→ "yes" to proceed' },
        LINE_PAUSE,
        wait,
      )
      pushLine({ kind: 'gap', visible: true })
      await scrollToBottom()
      interactive = true
      await wait(60)
      inputEl?.focus()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          animate()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(wrapEl)

    const blink = setInterval(() => {
      cursorOn = !cursorOn
    }, BLINK_RATE)
    return () => {
      cancelled = true
      clearInterval(blink)
      observer.disconnect()
    }
  })
</script>

<div class="tw" bind:this={wrapEl}>
  <!-- title bar -->
  <div class="bar">
    <span class="dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </span>
    <span class="bar-title">jacob@portfolio</span>
    <span class="bar-spacer"></span>
  </div>

  <!-- scrollable body -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="body" bind:this={bodyEl} onclick={() => inputEl?.focus()}>
    <div class="inner">
      {#each committed as line}
        {#if line.kind === 'gap'}
          <div class="gap" class:vis={line.visible}></div>
        {:else if line.kind === 'cmd'}
          <div class="row cmd" class:vis={line.visible}>
            <span class="prompt"
              ><span class="pu">jacob</span><span class="ps">@</span><span
                class="ph">portfolio</span
              ><span class="pa"> ❯ </span></span
            >
            <span class="cmd-txt">{line.text}</span>
          </div>
        {:else}
          <div class="row out vis" class:accent={line.accent}>
            {line.text}
          </div>
        {/if}
      {/each}

      <!-- live cursor / input row -->
      <div class="row cmd vis">
        <span class="prompt"
          ><span class="pu">jacob</span><span class="ps">@</span><span
            class="ph">portfolio</span
          ><span class="pa"> ❯ </span></span
        >
        {#if interactive}
          <!-- invisible real input, display is the styled text + caret -->
          <span class="cmd-txt">{userInput}</span><span
            class="caret"
            class:on={cursorOn}
          ></span>
          <input
            bind:this={inputEl}
            bind:value={userInput}
            class="ghost-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            onkeydown={(e) => {
              if (e.key === 'Enter') handleUserSubmit()
            }}
          />
        {:else}
          <span class="cmd-txt">{activeCmd}</span><span
            class="caret"
            class:on={cursorOn}
          ></span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .tw {
    font-family: 'JetBrains Mono Variable', monospace;
    width: 100%;
    max-width: 640px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid oklch(1 0 0 / 9%);
    background: oklch(0.13 0 0);
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 6%);
  }

  /* ── title bar ── */
  .bar {
    display: flex;
    align-items: center;
    padding: 0 16px;
    height: 40px;
    background: oklch(0.17 0 0 / 80%);
    border-bottom: 1px solid oklch(1 0 0 / 7%);
    gap: 10px;
  }

  .dots {
    display: flex;
    gap: 6px;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: oklch(1 0 0 / 10%);
  }

  .bar-title {
    flex: 1;
    text-align: center;
    font-size: 0.6875rem;
    letter-spacing: 0.06em;
    color: oklch(1 0 0 / 22%);
    user-select: none;
  }
  .bar-spacer {
    width: 38px;
  }

  /* ── scrollable body ── */
  .body {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 24px;
    box-sizing: border-box;
    mask-image: linear-gradient(to bottom, transparent 0%, black 18%);
    scrollbar-width: auto;
    scrollbar-color: oklch(1 0 0 / 22%) transparent;
    cursor: text;
  }

  .body::-webkit-scrollbar {
    width: 8px;
  }
  .body::-webkit-scrollbar-track {
    background: transparent;
  }
  .body::-webkit-scrollbar-thumb {
    background: oklch(1 0 0 / 22%);
    border-radius: 4px;
  }
  .body::-webkit-scrollbar-thumb:hover {
    background: oklch(1 0 0 / 35%);
  }

  .inner {
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
  }

  /* ── lines ── */
  .gap {
    height: 0.55em;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .gap.vis {
    opacity: 1;
  }

  .row {
    font-size: clamp(0.6875rem, 1.3vw, 0.8rem);
    line-height: 1.8;
    white-space: pre;
    color: oklch(0.45 0 0);
    opacity: 0;
    transform: translateY(3px);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
  .row.vis {
    opacity: 1;
    transform: translateY(0);
  }

  .cmd {
    display: flex;
    align-items: baseline;
    color: oklch(0.45 0 0);
  }

  .out {
    padding-left: 1.5rem;
    color: oklch(0.45 0 0);
  }
  .out.accent {
    color: oklch(0.5 0.2 265);
  }

  .prompt {
    flex-shrink: 0;
    user-select: none;
  }
  .pu {
    color: oklch(0.5 0.2 265);
  }
  .ps {
    color: oklch(0.38 0 0);
  }
  .ph {
    color: oklch(0.5 0.2 265 / 55%);
  }
  .pa {
    color: oklch(0.42 0 0);
    letter-spacing: -0.02em;
  }

  .cmd-txt {
    color: oklch(0.92 0 0);
    letter-spacing: 0.01em;
  }

  /* hidden real input — sits behind the styled display */
  .ghost-input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    pointer-events: none;
  }

  .caret {
    display: inline-block;
    width: 7px;
    height: 0.85em;
    background: oklch(0.5 0.2 265);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.06s;
    vertical-align: text-bottom;
    margin-left: 1px;
  }
  .caret.on {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .row,
    .gap {
      transition: none;
      opacity: 1;
      transform: none;
    }
    .caret {
      opacity: 1 !important;
    }
  }
</style>
