import { notFound } from "@tanstack/react-router";

/**
 * The `/_/` route's `beforeLoad`. Every URL but Home lives under `/_/` (ADR 0001), but `/_/`
 * itself is a URL prefix, not a page, so it renders the not-found page.
 */
export function prefixIsNotAPage(): never {
	throw notFound();
}
