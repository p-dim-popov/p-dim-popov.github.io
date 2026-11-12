import type { ReactNode } from "react";
import { Text } from "#platform/design-system";
import { OWNER_NAME } from "#platform/site";
import { RouterTextLink } from "./router-text-link";

/** The frame of every Blog page: a link back to Home above the page's own content. */
export function BlogLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex min-h-dvh max-w-measure flex-col gap-12 px-6 py-12">
			<header>
				<Text>
					<RouterTextLink to="/" activeOptions={{ exact: true }}>
						{OWNER_NAME}
					</RouterTextLink>
				</Text>
			</header>
			<main className="flex flex-col gap-8">{children}</main>
		</div>
	);
}
