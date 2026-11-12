import {
	type AbsoluteToPath,
	linkOptions,
	type RegisteredRouter,
} from "@tanstack/react-router";
import type { PagePath } from "#platform/site";
import type { PostSummary } from "./post-summaries";

/** A path in the route tree, with its trailing slash. Any other string fails typecheck. */
type RoutePath = AbsoluteToPath<RegisteredRouter, "/">;

/** The Blog index's path. */
export const BLOG_INDEX_PATH = "/_/blog/" satisfies RoutePath;

/**
 * The Post page's route path, with the slug as its `$slug` param. It is also the route's id,
 * which `getRouteApi()` takes.
 */
export const POST_ROUTE_PATH = `${BLOG_INDEX_PATH}$slug/` satisfies RoutePath;

/** A Post page's path: `POST_ROUTE_PATH` with the Post's slug in place of `$slug`. */
export function postPath(slug: string): PagePath {
	return `${BLOG_INDEX_PATH}${slug}/`;
}

/**
 * Where a Post's page is, as router link options:
 * `<Link {...postLinkOptions(post)}>` or any `createLink` component.
 */
export function postLinkOptions({ slug }: Pick<PostSummary, "slug">) {
	return linkOptions({ to: POST_ROUTE_PATH, params: { slug } });
}
