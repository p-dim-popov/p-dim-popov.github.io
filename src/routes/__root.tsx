import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage, SiteDocument } from "#platform/site";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Petar Popov" },
		],
	}),
	shellComponent: SiteDocument,
	component: Outlet,
	notFoundComponent: NotFoundPage,
});
