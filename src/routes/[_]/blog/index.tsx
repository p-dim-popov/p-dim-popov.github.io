import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage, blogIndexHead } from "#features/blog";

export const Route = createFileRoute("/_/blog/")({
	head: blogIndexHead,
	component: BlogIndexPage,
});
