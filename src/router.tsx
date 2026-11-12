import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	return createRouter({
		routeTree,
		// GitHub Pages serves every page as a directory index, so every URL ends with `/` (ADR 0001).
		trailingSlash: "always",
		scrollRestoration: true,
	});
}
