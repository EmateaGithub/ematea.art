<script lang="ts">
	import "./global.css"
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children?: Snippet
	} = $props()
</script>

<div class="container">
	<div class="content">
		{@render children?.()}
	</div>
	<footer>
		<p>Part of the <a href="https://ematea.city"><strong>Ematea Project</strong></a></p>
		<p><small>© {new Date().getFullYear()} Timothy Foster, All Rights Reserved</small></p>
	</footer>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-inline-size: 62.5rem;
		min-block-size: 100dvh;
		margin-inline: auto;
		padding-inline: 0.5rem;
	}

	.content { flex: 1; }

	.container :global(h1) {
		text-align: center;
		font-size: clamp(1.333rem, 2.752vw, 1.72rem);
		font-weight: bold;
		margin-block-end: 0.5em;
	}

	footer {
		text-align: center;
		padding-block: 4em 2em;
	}

	footer small {
		font-size: clamp(0.85rem, 1.6vw, 1rem);
	}
</style>