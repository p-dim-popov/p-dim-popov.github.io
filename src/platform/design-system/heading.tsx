import type { ReactNode } from "react";

const sizes = {
	display: "text-display",
	title: "text-title",
} as const;

export type HeadingProps = {
	/** The heading's rank: `1` renders `<h1>`. It sets the page structure, not the look. */
	level: 1 | 2 | 3 | 4 | 5 | 6;
	/** How large the heading looks. */
	size?: keyof typeof sizes;
	children: ReactNode;
};

export function Heading({ level, size = "title", children }: HeadingProps) {
	const Tag = `h${level}` as const;
	return (
		<Tag className={`${sizes[size]} text-balance text-ink`}>{children}</Tag>
	);
}
