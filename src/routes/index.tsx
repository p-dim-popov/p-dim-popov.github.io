import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead } from "#features/home";

export const Route = createFileRoute("/")({
	head: homeHead,
	component: HomePage,
});
