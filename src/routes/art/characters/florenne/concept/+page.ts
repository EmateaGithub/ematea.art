import type { ArtMetadata } from "$lib/ArtMetadata"
import { AkazaChan } from "$lib/artists"
import type { PageLoad } from "./$types"
import src from "./florenne-concept.png"

const metadata: ArtMetadata = {
	title: "Florenne Concept Art",
	description:
		"A young woman with blonde hair and a blue jacket, with two fluorescent lightbulbs on her head.",
	artist: AkazaChan,
	width: 3282,
	height: 2160,
}

export const load: PageLoad = () => {
	return {
		src,
		metadata,
	}
}
