import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

/*
 * Posts are the Markdown files in `posts/`. A Post's slug is its file name without `.md`.
 *
 * Two collections read the same files, so that summaries and bodies are generated into
 * separate modules. A page that only lists Posts imports the summaries and never ships a body.
 *
 * `mise run content` validates the frontmatter and generates both collections into
 * `.content-collections/`, which the `content-collections` import resolves to.
 * Invalid frontmatter fails it, and so fails `mise run build`.
 */

const postSummaries = defineCollection({
	name: "postSummaries",
	directory: "posts",
	include: "*.md",
	parser: "frontmatter-only",
	// The frontmatter. An unknown key fails too, so a typo never passes silently.
	schema: z.strictObject({
		title: z.string().trim().min(1),
		description: z.string().trim().min(1),
		/** The publish date, `YYYY-MM-DD`. */
		publishedOn: z.iso.date(),
	}),
	transform: ({ _meta, title, description, publishedOn }) => ({
		slug: _meta.path,
		title,
		description,
		publishedOn,
	}),
});

const postBodies = defineCollection({
	name: "postBodies",
	directory: "posts",
	include: "*.md",
	// The frontmatter is validated by `postSummaries` above; this keeps only the body.
	schema: z.object({ content: z.string() }),
	transform: ({ _meta, content }) => ({ slug: _meta.path, body: content }),
});

export default defineConfig({ content: [postSummaries, postBodies] });
