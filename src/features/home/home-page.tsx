import { Heading, Text } from "#platform/design-system";
import { RouterTextLink, useNavEntries } from "#platform/site";
import { LatestPosts } from "./latest-posts";
import { homeNavEntry } from "./nav-entry";

/**
 * Home frames itself: it uses neither `SiteNav` nor `SiteFooter`, and builds its own links to
 * the other parts of the Site from the nav entries.
 */
export function HomePage() {
	const elsewhere = useNavEntries().filter(
		(entry) => entry.to !== homeNavEntry.to,
	);
	return (
		<main className="mx-auto flex min-h-dvh max-w-measure flex-col justify-center gap-12 px-6 py-16">
			<div className="flex flex-col gap-6">
				<Heading level={1} size="display">
					Petar Popov
				</Heading>
				<Text size="lead">
					This is the personal Site of Petar Popov. It is under construction.
				</Text>
				<nav aria-label="Site">
					<ul className="flex flex-wrap gap-x-6 gap-y-2 text-lead">
						{elsewhere.map((entry) => (
							<li key={entry.to}>
								<RouterTextLink to={entry.to}>{entry.label}</RouterTextLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<LatestPosts />
		</main>
	);
}
