import { createFileRoute, Outlet } from "@tanstack/react-router";

// Every URL except Home lives under `/_/` (ADR 0001). This layout only renders its child route.
export const Route = createFileRoute("/_")({
	component: Outlet,
});
