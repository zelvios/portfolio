<script lang="ts">
  import { inView, motion, type MotionProps } from 'motion-sv'
  import { cn } from '$lib/utils.js'
  import { watch } from 'runed'

  interface WritingAnimationProps extends MotionProps {
    content?: string
    words?: string[]
    class?: string
    duration?: number
    typeSpeed?: number
    deleteSpeed?: number
    delay?: number
    pauseDelay?: number
    loop?: boolean
    startOnView?: boolean
    showCursor?: boolean
    blinkCursor?: boolean
    cursorStyle?: 'line' | 'block' | 'underscore'
    onComplete?: () => void
  }

  let {
    content,
    words,
    class: className,
    duration = 100,
    typeSpeed,
    deleteSpeed,
    delay = 0,
    pauseDelay = 1000,
    loop = false,
    startOnView = true,
    showCursor = true,
    blinkCursor = true,
    cursorStyle = 'line',
    onComplete,
    ...props
  }: WritingAnimationProps = $props()

  let displayedText = $state('')
  let currentWordIndex = $state(0)
  let currentCharIndex = $state(0)
  let phase = $state<'writing' | 'pause' | 'deleting'>('writing')

  let elementRef: HTMLElement | null = $state(null)

  let wordsToAnimate = $derived(words || (content ? [content] : []))
  let hasMultipleWords = $derived(wordsToAnimate.length > 1)
  let writingSpeed = $derived(typeSpeed || duration)
  let deletingSpeed = $derived(deleteSpeed || writingSpeed / 2)

  let isInView = $state(false)

  watch(
    () => elementRef,
    () => {
      if (!startOnView) {
        isInView = true
        return
      }

      if (!elementRef) return

      const cleanup = inView(
        elementRef,
        () => {
          isInView = true
        },
        { amount: 0.3 },
      )

      return cleanup
    },
  )

  let shouldStart = $derived(startOnView ? isInView : true)

  let timeoutId: ReturnType<typeof setTimeout> | undefined

  let runAnimation = () => {
    if (!shouldStart || wordsToAnimate.length === 0) return

    const currentWord = wordsToAnimate[currentWordIndex] || ''
    const graphemes = Array.from(currentWord)

    const timeoutDelay =
      delay > 0 && displayedText === ''
        ? delay
        : phase === 'writing'
          ? writingSpeed
          : phase === 'deleting'
            ? deletingSpeed
            : pauseDelay

    timeoutId = setTimeout(() => {
      switch (phase) {
        case 'writing':
          if (currentCharIndex < graphemes.length) {
            displayedText = graphemes.slice(0, currentCharIndex + 1).join('')
            currentCharIndex = currentCharIndex + 1
            runAnimation()
          } else {
            if (hasMultipleWords || loop) {
              const isLastWord = currentWordIndex === wordsToAnimate.length - 1
              if (!isLastWord || loop) {
                phase = 'pause'
                runAnimation()
              }
            }
          }
          break

        case 'pause':
          phase = 'deleting'
          runAnimation()
          break

        case 'deleting':
          if (currentCharIndex > 0) {
            displayedText = graphemes.slice(0, currentCharIndex - 1).join('')
            currentCharIndex = currentCharIndex - 1
            runAnimation()
          } else {
            currentWordIndex = (currentWordIndex + 1) % wordsToAnimate.length
            phase = 'writing'
            runAnimation()
          }
          break
      }
    }, timeoutDelay)
  }

  watch(
    () => shouldStart,
    () => {
      if (timeoutId) clearTimeout(timeoutId)

      displayedText = ''
      currentWordIndex = 0
      currentCharIndex = 0
      phase = 'writing'

      if (shouldStart && wordsToAnimate.length > 0) {
        runAnimation()
      }
    },
  )

  let currentWordGraphemes = $derived(
    Array.from(wordsToAnimate[currentWordIndex] || ''),
  )

  let isComplete = $derived(
    !loop &&
      currentWordIndex === wordsToAnimate.length - 1 &&
      currentCharIndex >= currentWordGraphemes.length &&
      phase !== 'deleting',
  )

  watch(
    () => isComplete,
    (complete) => {
      if (complete && onComplete) {
        onComplete()
      }
    },
  )

  let shouldShowCursor = $derived(
    showCursor &&
      !isComplete &&
      (hasMultipleWords ||
        loop ||
        currentCharIndex < currentWordGraphemes.length),
  )

  function getCursorChar() {
    switch (cursorStyle) {
      case 'block':
        return '▌'
      case 'underscore':
        return '_'
      case 'line':
      default:
        return '|'
    }
  }
</script>

<motion.span
  bind:ref={elementRef}
  class={cn('leading-20 tracking-[-0.02em]', className)}
  {...props}
>
  {displayedText}
  {#if shouldShowCursor}
    <span class={cn('inline-block', blinkCursor && 'animate-blink-cursor')}>
      {getCursorChar()}
    </span>
  {/if}
</motion.span>
