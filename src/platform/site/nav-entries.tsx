import type { AbsoluteToPath, RegisteredRouter } from "@tanstack/react-router";
import { createContext, use } from "react";

/**
 * One part of the Site in the nav: the link's text and the page it leads to.
 * Each feature exports its own entry, and the root route assembles them.
 */
export interface NavEntry {
	/** The link's text, such as "Blog". */
	label: string;
	/**
	 * The part's main page, as a path in the route tree with its trailing slash (ADR 0001).
	 * A path that matches no route, or lacks the slash, fails typecheck.
	 */
	to: AbsoluteToPath<RegisteredRouter, "/">;
}

/** The Site's nav entries. The site document provides them to every page. */
export const NavEntriesContext = createContext<readonly NavEntry[] | null>(
	null,
);

/**
 * The Site's nav entries, in nav order. A layout reads them to link to other parts of the
 * Site without importing those features.
 */
export function useNavEntries(): readonly NavEntry[] {
	const entries = use(NavEntriesContext);
	if (entries === null) {
		throw new Error(
			"No nav entries: the root route's shell must be `createSiteDocument({ nav })` from `#platform/site`.",
		);
	}
	return entries;
}
