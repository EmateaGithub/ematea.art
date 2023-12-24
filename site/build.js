import * as path from "path"
import * as fs from "fs/promises"
import { XMLParser } from "fast-xml-parser"
import { optimize as svgo } from "svgo"

const THIS_DIR = path.dirname(new URL(import.meta.url).pathname)
const STATIC_DIR = path.join(THIS_DIR, "static")
const ART_DIR = path.join("art")
const OUT_DIR = path.join("build")

async function main() {
	console.log("Building site...")

	const elapsed = await time(async () => {
		await resetOutDir()
		await copyStaticFiles()

		const art = await findAllArtFiles()
		const artPageTemplate = await createTemplateHtml("artpage")
		await Promise.all(art.map((artDetails) => {
			return createArtWebPage(artDetails, artPageTemplate)
		}))

		await createHomePage(art)
	})

	console.log(`...done! (${elapsed / 1000} seconds)`)
}

async function resetOutDir() {
	if (await directoryExists(OUT_DIR)) {
		await fs.rm(OUT_DIR, { recursive: true })
	}

	await fs.mkdir(OUT_DIR, { recursive: true })
}

async function copyStaticFiles() {
	const staticFiles = await fs.readdir(STATIC_DIR)

	await Promise.all(staticFiles.map((file) => {
		return fs.copyFile(path.join(STATIC_DIR, file), path.join(OUT_DIR, file))
	}))
}

async function findAllArtFiles() {
	const artFoldersAndFiles = await fs.readdir(ART_DIR, { recursive: true })
	const artFiles = artFoldersAndFiles.filter(isArtFile)

	return Promise.all(artFiles.map(getArtFileDetails))
}

async function createArtWebPage(art, template) {
	console.log(`\t...creating ${art.dir}/${art.name}`)

	const content = template({
		title: art.title,
		src: art.src,
		width: art.width,
		height: art.height,
		alt: art.description,
	})

	await fs.mkdir(path.join(OUT_DIR, art.dir), { recursive: true })
	await fs.writeFile(path.join(OUT_DIR, art.dir, `${art.name}.html`), content, "utf-8")
	await createOptimizeArtAsset(art)
}

async function createOptimizeArtAsset(art) {
	const svg = await fs.readFile(path.join(ART_DIR, art.fullPath), "utf-8")
	const optimizedSvg = await svgo(svg, {
		multipass: true,
	})

	await fs.writeFile(path.join(OUT_DIR, art.fullPath), optimizedSvg.data, "utf-8")
}

async function createHomePage(art) {
	const homePageTemplate = await createTemplateHtml("homepage")
	const artLinkTemplate = await createTemplateHtml("artlink")

	const artLinks = art.map(({ id, href, src, title, width, height }) => {
		return artLinkTemplate({
			id,
			name: title,
			href,
			src,
			width,
			height,
		})
	})

	const content = homePageTemplate({
		items: artLinks.join("\n")
	})

	await fs.writeFile(path.join(OUT_DIR, "index.html"), content, "utf-8")
}

async function createTemplateHtml(name) {
	const templateHtml = await fs.readFile(path.join(THIS_DIR, `${name}.html`), "utf-8")

	return (substitutions) => {
		return templateHtml.replace(/%([^%]+)%/g, (_, key) => {
			return substitutions[key]
		})	
	}
}

async function getArtFileDetails(filepath) {
	const { dir, name } = path.parse(filepath)

	const svg = await fs.readFile(path.join(ART_DIR, filepath), "utf-8")
	const svgObj = new XMLParser({
		ignoreAttributes: false,
	}).parse(svg)

	return {
		id: `${dir.replaceAll("/", "-")}-${name}`,
		dir,
		name,
		href: path.join("/", dir, name),
		src: path.join("/", filepath),
		fullPath: filepath,
		title: svgObj.svg.title["#text"],
		width: parseFloat(svgObj.svg["@_width"]),
		height: parseFloat(svgObj.svg["@_height"]),
		description: svgObj.svg.metadata?.["rdf:RDF"]?.["cc:Work"]?.["dc:description"],
	}
}

function isArtFile(filepath) {
	return path.extname(filepath) === ".svg"
}

async function directoryExists(dir) {
	try {
		const stat = await fs.stat(dir)

		return stat.isDirectory()
	} catch (err) {
		if (err.code === "ENOENT") {
			return false
		}

		throw err
	}
}

async function time(fn) {
	const start = Date.now()
	await fn()
	const end = Date.now()

	return end - start
}

main()
