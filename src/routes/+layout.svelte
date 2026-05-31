<script lang="ts">
  import './layout.css'
  import { navigating } from '$app/state'
  import { Header } from '$lib'

  let { children } = $props()
</script>

<Header />

<main class="w-screen h-screen overflow-y-auto">
  <div
    class="transition-opacity duration-300 ease-in-out"
    class:opacity-0={!!navigating.to}
  >
    {@render children()}
  </div>
</main>
