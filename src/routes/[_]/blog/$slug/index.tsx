import { createFileRoute } from "@tanstack/react-router";
import { loadPost, PostPage, postHead } from "#features/blog";

export const Route = createFileRoute("/_/blog/$slug/")({
	loader: loadPost,
	head: postHead,
	component: PostPage,
});
