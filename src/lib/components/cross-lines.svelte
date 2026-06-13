<script lang="ts">
  let { thickness = '1px', color = '128, 128, 128' } = $props<{
    thickness?: string
    color?: string
  }>()
</script>

<div class="relative w-full h-full pointer-events-none">
  <!-- Vertical line -->
  <div
    class="absolute top-0 bottom-0 -translate-x-1/2"
    style="
      left: 0px;
      width: {thickness};
      background: linear-gradient(to bottom, rgba({color}, 0) 0%, rgba({color}, 0.4) 85%, rgba({color}, 0) 100%);
    "
  ></div>

  <div
    class="absolute -translate-y-1/2"
    style="
      left: -160px;
      width: 700px;
      top: 75%;
      height: {thickness};
      /* The gradient matches the new total width of 400px to fade out gracefully */
      background: linear-gradient(to right, rgba({color}, 0) 0%, rgba({color}, 0.4) 160px, rgba({color}, 0) 100%);
    "
  ></div>
</div>
