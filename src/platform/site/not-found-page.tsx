import { Heading, Text } from "#platform/design-system";
import { PageHeadTags } from "./page-head";
import { RouterTextLink } from "./router-text-link";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

// The page's title and description, for its head and its visible text alike.
const TITLE = "Page not found";
const DESCRIPTION = "There is no page at this address.";

/** The router's not-found render. The build also saves it as `404.html`. */
export function NotFoundPage() {
	return (
		<div className="mx-auto flex min-h-dvh max-w-measure flex-col gap-12 px-6 py-12">
			<PageHeadTags title={TITLE} description={DESCRIPTION} path={null} />
			<header>
				<SiteNav />
			</header>
			<main className="flex flex-1 flex-col justify-center gap-4">
				<Heading level={1}>{TITLE}</Heading>
				<Text>{DESCRIPTION}</Text>
				<Text>
					<RouterTextLink to="/">Back to Home</RouterTextLink>
				</Text>
			</main>
			<SiteFooter />
		</div>
	);
}
