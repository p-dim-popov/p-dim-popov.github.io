import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "#platform/site";

/** The frame of every Blog page: the Site's nav, the page's own content, then the Site's footer. */
export function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex min-h-dvh max-w-measure flex-col gap-12 px-6 py-12">
			<header>
				<SiteNav />
			</header>
			<main className="flex flex-1 flex-col gap-8">{children}</main>
			<SiteFooter />
		</div>
	);
}
