import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** The html shell around every page: head content, the page itself and the router's scripts. */
export function SiteDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
