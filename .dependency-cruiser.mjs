// Module boundaries from ADR 0003, checked on resolved file paths.
//
// A module is a folder under src/platform/ or src/features/. Everything else under src/
// (src/routes/, src/router.tsx, src/server.ts, the generated route tree) is the
// composition root.
//
// In the "from" path of the first two rules, $1 is the importing module
// ("platform/site", "features/home") or, for the composition root, the first
// segment under src/ ("routes", "router.tsx"). A "to" path that starts with
// src/$1/ stays inside the importer's own module.

/** @type {import('dependency-cruiser').IConfiguration} */
export default {
	forbidden: [
		{
			name: "no-deep-module-import",
			comment:
				"Another module's internals are private. Import its index through '#platform/<name>' or '#features/<name>'.",
			severity: "error",
			from: { path: "^src/((?:platform|features)/[^/]+|[^/]+)" },
			to: {
				path: "^src/(?:platform|features)/[^/]+/",
				pathNot: ["^src/$1/", "^src/(?:platform|features)/[^/]+/index\\.ts$"],
			},
		},
		{
			name: "module-import-not-via-subpath",
			comment:
				"Import another module through its subpath import ('#platform/<name>' or '#features/<name>'), not a relative path.",
			severity: "error",
			from: { path: "^src/((?:platform|features)/[^/]+|[^/]+)" },
			to: {
				path: "^src/(?:platform|features)/[^/]+/",
				pathNot: "^src/$1/",
				dependencyTypesNot: ["aliased-subpath-import"],
			},
		},
		{
			name: "platform-imports-feature",
			comment:
				"Platform modules know nothing about features. Move the code into a feature, or pass the data in from the composition root.",
			severity: "error",
			from: { path: "^src/platform/" },
			to: { path: "^src/features/" },
		},
		{
			name: "design-system-imports-module",
			comment: "design-system is the bottom layer: it imports no other module.",
			severity: "error",
			from: { path: "^src/platform/design-system/" },
			to: { path: "^src/", pathNot: "^src/platform/design-system/" },
		},
		{
			name: "imports-route-file",
			comment:
				"Route files only wire a path to a feature, and only the generated route tree imports them. Move shared code into a module.",
			severity: "error",
			from: { pathNot: "^src/routeTree\\.gen\\.ts$" },
			to: { path: "^src/routes/" },
		},
		{
			name: "no-circular",
			comment:
				"Import cycles are not allowed. The one exemption is the type-only cycle TanStack generates between src/router.tsx and src/routeTree.gen.ts.",
			severity: "error",
			from: {},
			to: {
				circular: true,
				viaOnly: { pathNot: "^src/routeTree\\.gen\\.ts$" },
			},
		},
		{
			name: "not-to-unresolvable",
			comment:
				"The import doesn't resolve to a file. Boundary rules only see resolved paths, so every import must resolve.",
			severity: "error",
			from: {},
			to: { couldNotResolve: true },
		},
	],
	options: {
		doNotFollow: { path: "node_modules" },
		tsPreCompilationDeps: true,
		tsConfig: { fileName: "tsconfig.json" },
		enhancedResolveOptions: {
			exportsFields: ["exports"],
			conditionNames: ["import", "require", "node", "default", "types"],
			mainFields: ["module", "main", "types", "typings"],
		},
		reporterOptions: { text: { highlightFocused: true } },
	},
};
