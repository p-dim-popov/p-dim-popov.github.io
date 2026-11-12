import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	// Everything but Home and the crawl files lives under `/_/` (ADR 0001).
	build: { assetsDir: "_/assets" },
	plugins: [
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
				// `/_/` is a URL prefix, not a page.
				filter: ({ path }) => path !== "/_" && path !== "/_/",
			},
			pages: [
				{
					// No route matches `/_/404/`, so it renders the root route's not-found component.
					// `src/server.ts` turns the 404 into a 200 for requests with this header,
					// so the prerenderer saves the page.
					path: "/_/404/",
					prerender: {
						enabled: true,
						outputPath: "/404.html",
						headers: { "x-prerender-not-found": "1" },
					},
					sitemap: { exclude: true },
				},
			],
		}),
		viteReact(),
	],
});
