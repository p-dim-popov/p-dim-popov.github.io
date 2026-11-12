import { notFound } from "@tanstack/react-router";
import { findPostSummary, type PostSummary } from "./post-summaries";

/** A whole Post: its summary and its body. */
export interface Post extends PostSummary {
	/** The Post's Markdown, without the frontmatter. */
	body: string;
}

/**
 * The Post page's loader. A slug that matches no Post throws `notFound()`.
 *
 * Loaders are not code-split, and they run in the browser too (ADR 0002). So the bodies are
 * imported on demand: they ship in a chunk of their own, which only a Post page fetches.
 */
export async function loadPost({
	params,
}: {
	params: { slug: string };
}): Promise<Post> {
	const summary = findPostSummary(params.slug);
	if (summary === undefined) throw notFound();
	const { allPostBodies } = await import("content-collections");
	const post = allPostBodies.find(({ slug }) => slug === params.slug);
	if (post === undefined) throw notFound();
	return { ...summary, body: post.body };
}
