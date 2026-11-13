import { OWNER_NAME, pageHead } from "#platform/site";
import { BLOG_INDEX_PATH, postPath } from "./blog-paths";
import type { Post } from "./load-post";

export function blogIndexHead() {
	return pageHead({
		title: "Blog",
		description: `Posts by ${OWNER_NAME}, newest first.`,
		path: BLOG_INDEX_PATH,
	});
}

/** A Post page's head. With no loader data (an unknown slug), the not-found page sets the head. */
export function postHead({ loaderData }: { loaderData?: Post }) {
	if (loaderData === undefined) return {};
	return pageHead({
		title: loaderData.title,
		description: loaderData.description,
		path: postPath(loaderData.slug),
	});
}
