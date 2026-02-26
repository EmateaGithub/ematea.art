import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import svgo from 'vite-plugin-svgo'

export default defineConfig({
	plugins: [sveltekit(), svgo({
		multipass: true,
	})],
	build: {
		assetsInlineLimit: 0,
	},
	server: {
		port: 3001,
	},
})
