import type { ArtMetadata } from "$lib/ArtMetadata"
import { Auroratide } from "$lib/artists"
import type { PageLoad } from "./$types"
import src from "./logo.svg?url"

const metadata: ArtMetadata = {
	title: "Ematea Art Logo",
	description: "Tri-colored circular letter E, with paintbrush",
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
