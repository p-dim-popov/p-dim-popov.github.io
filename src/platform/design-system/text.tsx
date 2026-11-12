import type { ReactNode } from "react";

const sizes = {
	body: "text-body",
	lead: "text-lead",
} as const;

export type TextProps = {
	/** `lead` is for an opening paragraph. */
	size?: keyof typeof sizes;
	children: ReactNode;
};

/** A paragraph of running text. */
export function Text({ size = "body", children }: TextProps) {
	return <p className={`${sizes[size]} text-pretty text-ink`}>{children}</p>;
}
