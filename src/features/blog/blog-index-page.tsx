import { Heading, Text } from "#platform/design-system";
import { RouterTextLink } from "#platform/site";
import { BlogLayout } from "./blog-layout";
import { PostDate } from "./post-date";
import { postLinkOptions, postSummaries } from "./post-summaries";

/** The Blog index: every Post, newest first. */
export function BlogIndexPage() {
	return (
		<BlogLayout>
			<Heading level={1}>Blog</Heading>
			{postSummaries.length === 0 ? (
				<Text>No Posts yet.</Text>
			) : (
				<ul className="flex flex-col gap-10">
					{postSummaries.map((post) => (
						<li key={post.slug} className="flex flex-col gap-2">
							<Heading level={2} size="section">
								<RouterTextLink {...postLinkOptions(post)}>
									{post.title}
								</RouterTextLink>
							</Heading>
							<Text>
								<PostDate date={post.publishedOn} />
							</Text>
							<Text>{post.description}</Text>
						</li>
					))}
				</ul>
			)}
		</BlogLayout>
	);
}
