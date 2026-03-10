import type { ArtMetadata } from "$lib/ArtMetadata"
import { Auroratide } from "$lib/artists"
import type { PageLoad } from "./$types"
import src from "./amber.svg?url"

const metadata: ArtMetadata = {
	title: "Amber Element",
	description: "Red circle with two triangles.",
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
