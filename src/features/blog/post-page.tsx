import { getRouteApi } from "@tanstack/react-router";
import { Heading, Text } from "#platform/design-system";
import { RouterTextLink } from "#platform/site";
import { BlogLayout } from "./blog-layout";
import { PostBody } from "./post-body";
import { PostDate } from "./post-date";

/** The Post page's route, read by id: nothing imports route files. */
const postRoute = getRouteApi("/_/blog/$slug/");

/** One Post, from the data its route's loader (`loadPost`) returns. */
export function PostPage() {
	const post = postRoute.useLoaderData();
	return (
		<BlogLayout>
			<article className="flex flex-col gap-8">
				<header className="flex flex-col gap-2">
					<Heading level={1}>{post.title}</Heading>
					<Text>
						<PostDate date={post.publishedOn} />
					</Text>
				</header>
				<PostBody markdown={post.body} />
			</article>
			<Text>
				<RouterTextLink to="/_/blog/" activeOptions={{ exact: true }}>
					All Posts
				</RouterTextLink>
			</Text>
		</BlogLayout>
	);
}
