<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import { ArrowRight } from '@lucide/svelte';
	import Shot from '#lib/components/ui/Shot.svelte';

	interface Props {
		href: string;
		name: string;
		text: string;
		tag: string;
		date: string;
		image?: Picture;
	}

	let { href, name, text, tag, date, image }: Props = $props();
</script>

<a
	{href}
	data-spot
	class="group relative grid gap-x-6 gap-y-1 px-3 py-5 transition-colors hover:bg-base sm:grid-cols-[7rem_minmax(0,1fr)_14rem_1rem] sm:items-baseline"
>
	<time class="order-3 text-xs text-subtext0 sm:order-none">{date}</time>

	<span class="min-w-0">
		<span class="block text-lg font-bold text-accent">{name}</span>
		<span class="mt-0.5 block text-sm text-text">{text}</span>
	</span>

	<span class="order-4 text-xs leading-relaxed text-subtext0 sm:order-none">{tag}</span>

	<ArrowRight
		class="hidden size-4 self-center text-subtext0 transition-all group-hover:translate-x-0.5 group-hover:text-accent sm:block"
		aria-hidden="true"
	/>

	{#if image}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute z-10 hidden w-96 origin-left -translate-y-1/2 [transform:perspective(900px)_rotateY(0deg)_scale(0.94)] overflow-hidden rounded-md border border-surface1 bg-mantle opacity-0 shadow-2xl shadow-crust transition-[opacity,transform] duration-300 ease-out group-hover:[transform:perspective(900px)_rotateY(-14deg)_rotateX(4deg)_scale(1)] group-hover:opacity-100 motion-reduce:transition-none lg:block"
			style="left: clamp(0px, calc(var(--mx, 0px) + 24px), calc(100% - 24rem)); top: var(--my, 0px);"
		>
			<Shot src={image} alt="" fit="contain" sizes="384px" />
		</span>
	{/if}
</a>
