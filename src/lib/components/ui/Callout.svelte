<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		Info,
		Lightbulb,
		MessageSquareWarning,
		OctagonAlert,
		TriangleAlert
	} from '@lucide/svelte';
	import * as m from '#lib/paraglide/messages.js';

	type Kind = 'note' | 'tip' | 'important' | 'warning' | 'caution';

	let { type = 'note', children }: { type?: Kind; children: Snippet } = $props();

	const kinds = {
		note: { icon: Info, label: m.callout_note, color: 'border-blue text-blue' },
		tip: { icon: Lightbulb, label: m.callout_tip, color: 'border-green text-green' },
		important: {
			icon: MessageSquareWarning,
			label: m.callout_important,
			color: 'border-purple text-purple'
		},
		warning: { icon: TriangleAlert, label: m.callout_warning, color: 'border-yellow text-yellow' },
		caution: { icon: OctagonAlert, label: m.callout_caution, color: 'border-red text-red' }
	};

	const kind = $derived(kinds[type]);
	const Icon = $derived(kind.icon);
</script>

<div role="note" class="mt-6 border-l-2 py-1 pl-4 {kind.color}">
	<p class="mt-0 flex items-center gap-2 text-sm font-extrabold">
		<Icon class="size-4" aria-hidden="true" />
		{kind.label()}
	</p>
	<div class="mt-1.5 text-subtext1 [&_p]:mt-2 [&_p:first-child]:mt-0">
		{@render children()}
	</div>
</div>
