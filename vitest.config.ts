import { defineConfig } from "vitest/config";

// Kept apart from `vite.config.ts` so tests don't load the Start plugin or prerender.
export default defineConfig({
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		// No tests yet: the foundation has no logic that deserves one.
		passWithNoTests: true,
	},
});
