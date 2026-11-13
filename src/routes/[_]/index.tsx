import { createFileRoute } from "@tanstack/react-router";
import { prefixIsNotAPage } from "#platform/site";

export const Route = createFileRoute("/_/")({
	beforeLoad: prefixIsNotAPage,
});
