import { Markdown, type MarkdownComponents } from "@tanstack/markdown/react";
import type { ReactNode } from "react";
import { Heading, Text, TextLink } from "#platform/design-system";
import { RouterTextLink } from "#platform/site";

/**
 * A heading in a Post's body, at its Markdown level and the section size. The Post's title is
 * the page's `<h1>`, so a Post's own headings start at `##`.
 */
function postHeading(level: 2 | 3 | 4) {
	return ({ children }: { children?: ReactNode }) => (
		<Heading level={level} size="section">
			{children}
		</Heading>
	);
}

/**
 * How each Markdown element renders: through `design-system` where it has a primitive,
 * otherwise with token utilities.
 */
const components = {
	h2: postHeading(2),
	h3: postHeading(3),
	h4: postHeading(4),
	p: ({ children }) => <Text>{children}</Text>,
	// Links to other pages of the Site navigate through the router, which also adds the
	// trailing slash. The prerender crawls them, so a broken one fails the build.
	a: ({ href = "", children, ...props }) =>
		href.startsWith("/") && !href.startsWith("//") ? (
			<RouterTextLink to={href} activeOptions={{ exact: true }}>
				{children}
			</RouterTextLink>
		) : (
			<TextLink href={href} {...props}>
				{children}
			</TextLink>
		),
	ul: ({ children }) => (
		<ul className="flex list-disc flex-col gap-2 pl-6 text-body text-ink">
			{children}
		</ul>
	),
	ol: ({ children, start }) => (
		<ol
			start={start}
			className="flex list-decimal flex-col gap-2 pl-6 text-body text-ink"
		>
			{children}
		</ol>
	),
	blockquote: ({ children }) => (
		<blockquote className="flex flex-col gap-4 border-l-2 border-ink pl-4">
			{children}
		</blockquote>
	),
	pre: ({ children, ...props }) => (
		<pre {...props} className="overflow-x-auto">
			{children}
		</pre>
	),
} satisfies MarkdownComponents;

/** A Post's body, rendered from its Markdown at build time and again on client navigation. */
export function PostBody({ markdown }: { markdown: string }) {
	return (
		<div className="flex flex-col gap-4">
			<Markdown components={components}>{markdown}</Markdown>
		</div>
	);
}
