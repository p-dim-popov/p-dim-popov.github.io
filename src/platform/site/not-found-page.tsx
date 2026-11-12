import { createLink } from "@tanstack/react-router";
import { Heading, Text, TextLink } from "#platform/design-system";
import { PageHeadTags } from "./page-head";

const RouterTextLink = createLink(TextLink);

/** The router's not-found render. The build also saves it as `404.html`. */
export function NotFoundPage() {
	return (
		<main className="mx-auto flex min-h-dvh max-w-measure flex-col justify-center gap-4 px-6 py-16">
			<PageHeadTags
				title="Page not found"
				description="There is no page at this address."
				path={null}
			/>
			<Heading level={1}>Page not found</Heading>
			<Text>There is no page at this address.</Text>
			<Text>
				<RouterTextLink to="/">Back to Home</RouterTextLink>
			</Text>
		</main>
	);
}
