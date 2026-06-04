<script lang="ts">
  import { Tree, Folder, File } from './file-tree/'
  import { goto } from '$app/navigation'
</script>

<div
  class="bg-background relative mx-auto flex h-80 w-70 flex-col items-center justify-center overflow-hidden rounded-lg border md:m-6 md:mx-auto"
>
  <Tree
    class="bg-background w-full overflow-hidden rounded-md p-4"
    initialSelectedId="3"
    initialExpandedItems={['1', '2', '8']}
  >
    <Folder element="src" value="1">
      <Folder value="2" element="routes">
        <File value="3" onclick={() => goto('/')} class="text-highlight">
          <p>
            +page.svelte <span class="text-muted-foreground ml-1 text-xs"
              >(Home)</span
            >
          </p>
        </File>

        <Folder value="4" element="about">
          <File value="5" onclick={() => goto('/about')}>
            <p>+page.svelte</p>
          </File>
        </Folder>

        <Folder value="6" element="contact">
          <File value="7" onclick={() => goto('/contact')}>
            <p>+page.svelte</p>
          </File>
        </Folder>

        <Folder value="8" element="projects">
          <File value="9" onclick={() => goto('/projects')}>
            <p>+page.svelte</p>
          </File>

          <Folder value="10" element="[slug]">
            <File value="11" onclick={() => goto('/projects/portfolio')}>
              <p>
                +page.svelte <span class="text-muted-foreground ml-1 text-xs"
                  >(Portfolio)</span
                >
              </p>
            </File>
          </Folder>
        </Folder>
      </Folder>
    </Folder>
  </Tree>
</div>
