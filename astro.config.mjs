// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import react from "@astrojs/react"
// https://astro.build/config
export default defineConfig({
	site: "https://m1rxcle.github.io",
	// base: "/astro-card",
	output: "static",
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["three", "@react-three/fiber", "@react-three/drei", "gsap"],
		},
		optimizeDeps: {
			include: ["react", "react-dom"],
		},
	},
	integrations: [react()],
})
