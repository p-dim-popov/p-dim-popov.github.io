import { createRootRoute, Outlet } from "@tanstack/react-router";
import { stylesheetHref } from "#platform/design-system";
import { NotFoundPage, SiteDocument } from "#platform/site";

export const Route = createRootRoute({
	// Document-wide tags only. Each page's own route head (or the not-found page)
	// adds its title, description, canonical URL and Open Graph tags through `site`.
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [{ rel: "stylesheet", href: stylesheetHref }],
	}),
	shellComponent: SiteDocument,
	component: Outlet,
	notFoundComponent: NotFoundPage,
});
