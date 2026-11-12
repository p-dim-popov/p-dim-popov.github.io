import { PostDate, postLinkOptions, postSummaries } from "#features/blog";
import { Heading, Text } from "#platform/design-system";
import { RouterTextLink } from "#platform/site";

/** How many Posts Home lists. */
const LATEST_POST_COUNT = 3;

/**
 * The newest Posts, from `blog`'s summaries, so Home ships no Post body.
 * Renders nothing while the Blog has no Posts.
 */
export function LatestPosts() {
	const latest = postSummaries.slice(0, LATEST_POST_COUNT);
	if (latest.length === 0) return null;
	return (
		<section className="flex flex-col gap-4">
			<Heading level={2} size="section">
				Latest Posts
			</Heading>
			<ul className="flex flex-col gap-4">
				{latest.map((post) => (
					<li key={post.slug} className="flex flex-col gap-1">
						<Text>
							<RouterTextLink {...postLinkOptions(post)}>
								{post.title}
							</RouterTextLink>
						</Text>
						<Text>
							<PostDate date={post.publishedOn} />
						</Text>
					</li>
				))}
			</ul>
		</section>
	);
}
