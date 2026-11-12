import { Link } from "@tanstack/react-router";

/** The router's not-found render. The build also saves it as `404.html`. */
export function NotFoundPage() {
	return (
		<main>
			<h1>Page not found</h1>
			<p>There is no page at this address.</p>
			<Link to="/">Back to Home</Link>
		</main>
	);
}
