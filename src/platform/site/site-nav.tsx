import { useNavEntries } from "./nav-entries";
import { RouterTextLink } from "./router-text-link";

export interface SiteNavProps {
	/** Token utilities that place the nav in a layout. */
	className?: string;
}

/**
 * The Site's nav: a link to each part of the Site, from the nav entries. The link to the page
 * being shown gets `aria-current="page"`.
 *
 * Optional: a layout can render it, or build its own links with `useNavEntries()`. It is made of
 * token utilities and `design-system`'s link, so a scoped theme restyles it.
 */
export function SiteNav({ className }: SiteNavProps) {
	const entries = useNavEntries();
	return (
		<nav aria-label="Site" className={className}>
			<ul className="flex flex-wrap gap-x-6 gap-y-2 text-body">
				{entries.map((entry) => (
					<li key={entry.to}>
						<RouterTextLink to={entry.to} activeOptions={{ exact: true }}>
							{entry.label}
						</RouterTextLink>
					</li>
				))}
			</ul>
		</nav>
	);
}
