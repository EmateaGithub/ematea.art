import * as path from "path"
import * as fs from "fs/promises"

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
		await Promise.all(art.map((filepath) => {
			return createArtWebPage(filepath, artPageTemplate)
		}))

		await createHomePage(art)
	})

	console.log(`...done! (${elapsed / 1000} seconds)`)
}

async function resetOutDir() {
	await fs.rm(OUT_DIR, { recursive: true })
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

	return artFoldersAndFiles.filter(isArtFile)
}

async function createArtWebPage(filepath, template) {
	const { dir, name } = path.parse(filepath)
	console.log(`\t...creating ${filepath}`)

	const content = template({
		title: name,
		src: path.join("/", filepath),
		alt: "TODO",
		desc: "TODO"
	})

	await fs.mkdir(path.join(OUT_DIR, dir), { recursive: true })
	await fs.copyFile(path.join(ART_DIR, filepath), path.join(OUT_DIR, filepath))
	await fs.writeFile(path.join(OUT_DIR, dir, `${name}.html`), content, "utf-8")
}

async function createHomePage(art) {
	const homePageTemplate = await createTemplateHtml("homepage")
	const artLinkTemplate = await createTemplateHtml("artlink")

	const artLinks = art.map((filepath) => {
		const { dir, name } = path.parse(filepath)

		return artLinkTemplate({
			href: path.join("/", dir, name),
			src: path.join("/", filepath),
			alt: "TODO",
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

function isArtFile(filepath) {
	return path.extname(filepath) === ".svg"
}

async function time(fn) {
	const start = Date.now()
	await fn()
	const end = Date.now()

	return end - start
}

main()
