import type { ArtMetadata } from "$lib/ArtMetadata"
import type { PageLoad } from "./$types"
import { Auroratide } from "$lib/artists"
import src from "./logo.svg?url"

const metadata: ArtMetadata = {
	title: "Taxicap Logo",
	description: "Striped trapezoid.",
	artist: Auroratide,
	width: 120,
	height: 120,
}

export const load: PageLoad = () => {
	return {
		src,
		metadata,
	}
}
