import type { ArtMetadata } from "$lib/ArtMetadata"
import { Auroratide } from "$lib/artists"
import type { PageLoad } from "./$types"
import src from "./jolt.svg?url"

const metadata: ArtMetadata = {
	title: "Jolt Element",
	description: "Yellow circle with two V shapes.",
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
