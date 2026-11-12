import { Text } from "#platform/design-system";
import { OWNER_NAME } from "./identity";

export interface SiteFooterProps {
	/** Token utilities that place the footer in a layout. */
	className?: string;
}

/**
 * The Site's footer: whose Site this is.
 *
 * Optional, like `SiteNav`, and restyled the same way: by a scoped theme, or placed with `className`.
 */
export function SiteFooter({ className }: SiteFooterProps) {
	return (
		<footer className={className}>
			<Text>© {OWNER_NAME}</Text>
		</footer>
	);
}
