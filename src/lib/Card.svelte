<script lang="ts">
	import type { ArtMetadata } from "./ArtMetadata";

	let {
		href,
		src,
		metadata
	}: {
		href: string,
		src: string,
		metadata: ArtMetadata,
	} = $props()

	let id = $derived(href.replaceAll("/", "-"))
</script>

<a {href} class="card-link">
	<article aria-labelledby="{id}" class="card">
		<img {src} loading="lazy" alt="" width="{metadata.width}" height="{metadata.height}" />
		<h2 {id} class="card-caption">{metadata.title}</h2>
	</article>
</a>

<style>
	h2 {
		font-size: clamp(1rem, 2vw, 1.2rem);
		font-weight: normal;
		margin: 0;
	}

	.card-link {
		display: block;
		height: 100%;
	}

	.card-link, .card-link:hover, .card-link:focus {
		outline: none;
		opacity: 1;
	}

	a:hover .card, a:focus .card {
		transform: translateY(-0.25pc);
		border-color: oklch(86% 0.155 87);
	}

	.card-link:active .card {
		filter: brightness(0.5);
	}

	.card {
		height: 100%;
		border: 0.333rem solid oklch(50% 0.021 330);
		border-radius: 0.667rem;
		background-color: oklch(25% 0.014 320);
		transition:
			transform 0.125s ease-in-out,
			border-color 0.125s ease-in-out;
		color: oklch(90% 0.007 330);
		display: flex;
		flex-direction: column;
		padding: 0;
		text-align: center;
		position: relative;
		overflow: hidden;
	}

	.card img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		flex: 1;
	}

	.card-caption {
		position: absolute;
		inset-inline: 0;
		inset-block-end: 0;
		padding: 0.5rem;
		background-color: oklch(0% 0 0 / 0.8);
		border-radius: 0 0 0.333rem 0.333rem;
	}
</style>