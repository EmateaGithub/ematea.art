import type { Artist } from "./artists"

export type ArtMetadata = {
	title: string,
	description: string,
	artist: Artist,
	width: number,
	height: number,
}
