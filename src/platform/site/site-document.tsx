import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { NavEntriesContext, type NavEntry } from "./nav-entries";

export interface SiteDocumentOptions {
	/** Every part of the Site, in nav order. */
	nav: readonly NavEntry[];
}

/**
 * The root route's `shellComponent`: the html shell around every page, with head content, the
 * page itself and the router's scripts.
 *
 * It also provides the nav entries to every page. They live in the shell because the router
 * swaps the root route's component for the not-found page, but always keeps the shell. A shell
 * gets no props but its children, so the entries are bound here, once, by the root route.
 */
export function createSiteDocument({ nav }: SiteDocumentOptions) {
	// biome-ignore lint/correctness/noComponentHookFactories: the root route calls this once, at module scope, so the component is created once.
	return function SiteDocument({ children }: { children: ReactNode }) {
		return (
			<html lang="en">
				<head>
					<HeadContent />
				</head>
				<body>
					<NavEntriesContext value={nav}>{children}</NavEntriesContext>
					<Scripts />
				</body>
			</html>
		);
	};
}
