import { Markdown, type MarkdownComponents } from "@tanstack/markdown/react";
import { Heading, Text, TextLink } from "#platform/design-system";
import { RouterTextLink } from "./router-text-link";

/**
 * How each Markdown element renders: through `design-system` where it has a primitive,
 * otherwise with token utilities.
 */
const components = {
	// The Post's title is the page's `<h1>`, so a Post's own headings start at `##`.
	h2: ({ children }) => (
		<Heading level={2} size="section">
			{children}
		</Heading>
	),
	h3: ({ children }) => (
		<Heading level={3} size="section">
			{children}
		</Heading>
	),
	h4: ({ children }) => (
		<Heading level={4} size="section">
			{children}
		</Heading>
	),
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
