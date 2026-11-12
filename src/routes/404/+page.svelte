<script lang="ts">
	import ErrorView from '#lib/components/sections/ErrorView.svelte';
</script>

<svelte:head>
	<title>404 - Jacob Jørgensen</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<ErrorView status={404} />
