/** The Site's owner. */
export const OWNER_NAME = "Petar Popov";

/**
 * Where the Site is served (ADR 0001). Canonical URLs and the sitemap build on it.
 * The sitemap host in `vite.config.ts` and `public/robots.txt` repeat it: change all three together.
 */
export const SITE_ORIGIN = "https://p-dim-popov.github.io";

/**
 * The title template: the page's own title, then the owner's name.
 * Home has no title of its own, so its title is the owner's name alone.
 */
export function siteTitle(pageTitle?: string): string {
	return pageTitle === undefined ? OWNER_NAME : `${pageTitle} · ${OWNER_NAME}`;
}
