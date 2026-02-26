<script lang="ts">
	import Card from "$lib/Card.svelte";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props()
</script>

<svelte:head>
	<title>Ematea Art</title>
</svelte:head>

<div class="empty-header"></div>
<h1 class="title">ematea.art</h1>
<ul class="columns-list">
	{#each data.list as item (item.href)}
		<li>
			<Card href={item.href} src={item.src} metadata={item.metadata} />
		</li>
	{/each}
</ul>

<style>
	h1.title {
		margin-block-end: 1.5em;
	}

	.empty-header {
		block-size: 3.5rem;
	}

	.columns-list {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		grid-auto-rows: 15rem;
		gap: 1rem;
	}
</style>
