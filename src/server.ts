import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

/**
 * Must match the header that `vite.config.ts` sends when it prerenders `404.html`.
 * Only the prerenderer sends it.
 */
const PRERENDER_NOT_FOUND_HEADER = "x-prerender-not-found";

/**
 * Server entry for the build only: the Site has no server runtime (ADR 0002).
 *
 * Start's prerenderer saves only 200 responses. To save the router's own not-found
 * render as `404.html`, this entry relabels the 404 as 200, and only for the request
 * that carries the prerenderer's header.
 */
export default createServerEntry({
	async fetch(request, ...rest) {
		const response = await handler.fetch(request, ...rest);
		if (
			response.status === 404 &&
			request.headers.get(PRERENDER_NOT_FOUND_HEADER) === "1"
		) {
			return new Response(response.body, {
				status: 200,
				headers: response.headers,
			});
		}
		return response;
	},
});
