import { OWNER_NAME, SITE_ORIGIN, siteTitle } from "./identity";

/** A page's path. Every Site URL ends with `/` (ADR 0001). */
export type PagePath = "/" | `/${string}/`;

export interface PageHeadInput {
	/** The page's own title. Home leaves it out, so its title is the owner's name alone. */
	title?: string;
	/** A sentence or two for search results and link previews. */
	description: string;
	/**
	 * The page's path, which gives its canonical URL.
	 * `null` for the not-found page: it has no URL of its own, so it gets no canonical URL
	 * and asks search engines not to index it.
	 */
	path: PagePath | null;
}

type MetaTag =
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string };

type LinkTag = { rel: string; href: string };

export interface PageHead {
	meta: MetaTag[];
	links: LinkTag[];
}

/**
 * The head of one page: its title, description, canonical URL and Open Graph tags.
 * A route returns it from `head()`.
 *
 * Call it in the page's own route only, never in the root or a layout route: the router
 * does not deduplicate links, so a second canonical URL would appear.
 */
export function pageHead({
	title,
	description,
	path,
}: PageHeadInput): PageHead {
	const meta: MetaTag[] = [
		{ title: siteTitle(title) },
		{ name: "description", content: description },
		{ property: "og:site_name", content: OWNER_NAME },
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title ?? OWNER_NAME },
		{ property: "og:description", content: description },
	];
	if (path === null) {
		return {
			meta: [...meta, { name: "robots", content: "noindex" }],
			links: [],
		};
	}
	const url = `${SITE_ORIGIN}${path}`;
	return {
		meta: [...meta, { property: "og:url", content: url }],
		links: [{ rel: "canonical", href: url }],
	};
}

/**
 * Renders `pageHead()` as elements, for the not-found page, which has no route `head()`.
 * React hoists them into the document head.
 */
export function PageHeadTags(input: PageHeadInput) {
	const { meta, links } = pageHead(input);
	return (
		<>
			{meta.map((tag) =>
				"title" in tag ? (
					<title key="title">{tag.title}</title>
				) : (
					<meta key={"name" in tag ? tag.name : tag.property} {...tag} />
				),
			)}
			{links.map((link) => (
				<link key={link.rel} {...link} />
			))}
		</>
	);
}
