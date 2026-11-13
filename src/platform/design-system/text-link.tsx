import type { ComponentPropsWithRef } from "react";

const textLinkClasses =
	"text-accent underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export type TextLinkProps = ComponentPropsWithRef<"a">;

/**
 * A link inside running text. It renders a plain `<a>` and knows nothing about routing:
 * wrap it with the router's `createLink` to navigate on the client.
 */
export function TextLink({ className, children, ...props }: TextLinkProps) {
	return (
		<a
			{...props}
			className={
				className ? `${textLinkClasses} ${className}` : textLinkClasses
			}
		>
			{children}
		</a>
	);
}
