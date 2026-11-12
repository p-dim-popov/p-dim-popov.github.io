import { createFileRoute, notFound } from "@tanstack/react-router";

// `/_/` is a URL prefix, not a page.
export const Route = createFileRoute("/_/")({
	beforeLoad: () => {
		throw notFound();
	},
});
