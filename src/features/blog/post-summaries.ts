import { linkOptions } from "@tanstack/react-router";
import { allPostSummaries } from "content-collections";

/** What a list of Posts shows: everything about a Post except its body. */
export interface PostSummary {
	/** The Post's URL segment: its file name without `.md`. */
	slug: string;
	title: string;
	description: string;
	/** The publish date, `YYYY-MM-DD`. */
	publishedOn: string;
}

/**
 * Every Post's summary, newest first.
 *
 * Importing it ships the summaries only. Post bodies stay in their own chunk, which only a
 * Post page loads, so any page may list Posts through it.
 */
export const postSummaries: readonly PostSummary[] = allPostSummaries.toSorted(
	// ISO dates sort as strings.
	(a, b) => b.publishedOn.localeCompare(a.publishedOn),
);

export function findPostSummary(slug: string): PostSummary | undefined {
	return postSummaries.find((post) => post.slug === slug);
}

/**
 * Where a Post's page is, as router link options:
 * `<Link {...postLinkOptions(post)}>` or any `createLink` component.
 */
export function postLinkOptions({ slug }: Pick<PostSummary, "slug">) {
	return linkOptions({ to: "/_/blog/$slug/", params: { slug } });
}
