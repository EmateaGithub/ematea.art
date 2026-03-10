import type { ArtMetadata } from "$lib/ArtMetadata"
import { Auroratide } from "$lib/artists"
import type { PageLoad } from "./$types"
import src from "./stream.svg?url"

const metadata: ArtMetadata = {
	title: "Stream Element",
	description: "Blue circle with two circles.",
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
