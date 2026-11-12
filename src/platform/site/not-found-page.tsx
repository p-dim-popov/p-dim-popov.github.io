import { Link } from "@tanstack/react-router";
import { PageHeadTags } from "./page-head";

/** The router's not-found render. The build also saves it as `404.html`. */
export function NotFoundPage() {
	return (
		<main>
			<PageHeadTags
				title="Page not found"
				description="There is no page at this address."
				path={null}
			/>
			<h1>Page not found</h1>
			<p>There is no page at this address.</p>
			<Link to="/">Back to Home</Link>
		</main>
	);
}
