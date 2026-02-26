<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state"

	let metadata = $derived(page.data.metadata)
</script>

<svelte:head>
	<meta name="og:title" content="{metadata.title}" />
	<meta name="og:description" content="Art used by the Ematea project." />
	<meta name="og:image" content="{page.data.src}" />
	<meta name="og:image:alt" content="{metadata.description}" />
	<meta name="og:url" content="https://www.ematea.art{page.url.pathname}" />
	<meta name="og:site_name" content="Ematea" />

	<title>{metadata.title} | Ematea Art</title>
</svelte:head>

<header>
	<nav>
		<a href="{resolve("/")}">
			<span aria-hidden="true" class="back-button">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<title>Back</title>
					<path d="M15 7L10 12L15 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
			<span class="visually-hidden">Back to</span>
			<span>ematea.art</span>
		</a>
	</nav>
</header>
<main>
	<section class="info">
		<h1>{metadata.title}</h1>
		<address class="byline">Drawn by <a href="{metadata.artist.link}">{metadata.artist.name}</a></address>
	</section>
	<section>
		<img src="{page.data.src}" alt="{metadata.description}" width="{metadata.width}" height="{metadata.height}" />
	</section>
</main>

<style>
	img {
		display: block;
		inline-size: 100%;
		block-size: auto;
		max-block-size: calc(90dvh - 5em);
	}

	a:active .back-button svg {
		inset-inline-start: -0.0625em;
	}

	header {
		height: 3.5rem;
		display: flex;
		align-items: center;
	}

	header a {
		text-decoration: none;
		color: oklch(90% 0.007 330);
		display: flex;
		align-items: center;
		gap: 0.75em;
	}

	header a:focus {
		outline: none;
	}

	.back-button {
		display: inline-block;
		border: 0.25em solid currentColor;
		border-radius: 0.5em;
		line-height: 1;
		transition:
			border-color 0.125s ease-in-out,
			color 0.125s ease-in-out;
	}

	.back-button svg {
		position: relative;
		font-size: 2rem;
		width: 1em;
		height: 1em;
		display: block;
	}

	.info {
		margin-block-end: 2em;
	}

	.byline {
		font-style: normal;
		text-align: center;
		font-size: 0.875em;
	}
</style>