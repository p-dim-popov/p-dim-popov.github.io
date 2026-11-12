import { createRootRoute, Outlet } from "@tanstack/react-router";
import { blogNavEntry } from "#features/blog";
import { homeNavEntry } from "#features/home";
import { stylesheetHref } from "#platform/design-system";
import { createSiteDocument, NotFoundPage } from "#platform/site";

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
	// The nav entries, assembled once, in nav order. Each feature exports its own entry, and the
	// shell provides them to every page, so no feature imports another just to link to it.
	shellComponent: createSiteDocument({ nav: [homeNavEntry, blogNavEntry] }),
	component: Outlet,
	notFoundComponent: NotFoundPage,
});
