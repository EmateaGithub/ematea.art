import type { ArtMetadata } from "$lib/ArtMetadata"
import type { PageLoad } from "./$types"
import { Auroratide } from "$lib/artists"
import src from "./draft.svg?url"

const metadata: ArtMetadata = {
	title: "Draft Element",
	description: "Green circle with two moon shapes.",
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
