import type { ArtMetadata } from "$lib/ArtMetadata"
import type { PageLoad } from "./$types"
import { AkazaChan } from "$lib/artists"
import src from "./parie-concept.png"

const metadata: ArtMetadata = {
	title: "Parie Concept Art",
	description: "A young woman with orange hair and a green jacket.",
	artist: AkazaChan,
	width: 2960,
	height: 2160,
}

export const load: PageLoad = () => {
	return {
		src,
		metadata,
	}
}
