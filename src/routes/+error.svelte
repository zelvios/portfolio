<script lang="ts">
	import { page } from '$app/state';
	import ErrorView from '#lib/components/sections/ErrorView.svelte';
</script>

<svelte:head>
	<title>{page.status} - Jacob Jørgensen</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<ErrorView status={page.status} />
