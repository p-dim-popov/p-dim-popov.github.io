import { rm } from "node:fs/promises";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * Start writes `pages.json` next to `sitemap.xml`, and nothing reads it. Only the crawl files
 * may sit at the root (ADR 0001), so this removes it after Start's post-build step.
 * List it after `tanstackStart()`.
 */
function dropPagesJson(): Plugin {
	return {
		name: "drop-pages-json",
		apply: "build",
		enforce: "post",
		buildApp: {
			order: "post",
			async handler(builder) {
				const outDir = builder.environments.client?.config.build.outDir;
				if (outDir === undefined) return;
				await rm(join(builder.config.root, outDir, "pages.json"), {
					force: true,
				});
			},
		},
	};
}

export default defineConfig({
	// Everything but Home and the crawl files lives under `/_/` (ADR 0001).
	build: { assetsDir: "_/assets" },
	plugins: [
		tailwindcss(),
		tanstackStart({
			prerender: { enabled: true, crawlLinks: true, failOnError: true },
			pages: [
				{
					// `/_/` is a URL prefix, not a page. Its layout route has a component, so Start
					// discovers `/_` as a page: this entry keeps it out of the prerender and the sitemap.
					path: "/_",
					prerender: { enabled: false },
					sitemap: { exclude: true },
				},
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
			// Lists every other page Start discovers or crawls. The host is `SITE_ORIGIN` from
			// `#platform/site`, repeated here so that the build config loads none of the Site's code.
			sitemap: { host: "https://p-dim-popov.github.io" },
		}),
		viteReact(),
		dropPagesJson(),
	],
});
