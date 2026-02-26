import type { ArtMetadata } from "$lib/ArtMetadata"
import type { PageLoad } from "./$types"

type ArtPageLoad = {
	load: () => {
		src: string,
		metadata: ArtMetadata
	}
}

export const load: PageLoad = async () => {
	const modules = import.meta.glob<true, string, ArtPageLoad>("./art/**/+page.ts", { eager: true })

	return {
		list: Object.entries(modules).map(([path, module]) => {
			const href = path.substring(1, path.lastIndexOf("/"))
			const data = module.load()

			return {
				href: href,
				src: data.src,
				metadata: data.metadata,
			}
		})
	}
}
