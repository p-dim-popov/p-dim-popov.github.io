// Serves the prerendered build the way GitHub Pages serves it, for local checks.
//
// Usage: `mise run serve:pages [port]`, or node scripts/serve-pages.mjs [port] [dir]
//        (defaults: 4173, dist/client)
//
// - `/dir` answers 301 to `/dir/`.
// - `/dir/` serves `dir/index.html`.
// - `/name` serves `name`, or else `name.html`.
// - Anything else serves `404.html` with HTTP 404.

import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const port = Number(args[0] ?? 4173);
const root = resolve(args[1] ?? "dist/client");

const contentTypes = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json",
	".xml": "application/xml",
	".txt": "text/plain; charset=utf-8",
	".ico": "image/x-icon",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".webp": "image/webp",
	".woff2": "font/woff2",
};

async function kindOf(path) {
	try {
		const stats = await stat(path);
		return stats.isFile() ? "file" : stats.isDirectory() ? "dir" : null;
	} catch {
		return null;
	}
}

if ((await kindOf(join(root, "404.html"))) !== "file") {
	console.error(`No 404.html in ${root}. Run \`mise run build\` first.`);
	process.exit(1);
}

const server = createServer(async (request, response) => {
	const send = async (file, status) => {
		const body = await readFile(file);
		response.writeHead(status, {
			"content-type": contentTypes[extname(file)] ?? "application/octet-stream",
			"content-length": body.length,
		});
		response.end(request.method === "HEAD" ? undefined : body);
	};

	const path = decodeURIComponent(
		new URL(request.url ?? "/", "http://localhost").pathname,
	);
	const target = join(root, path);
	if (target !== root && !target.startsWith(root + sep)) {
		return send(join(root, "404.html"), 404);
	}

	if (!path.endsWith("/") && (await kindOf(target)) === "dir") {
		response.writeHead(301, { location: `${path}/` });
		return response.end();
	}
	if (
		path.endsWith("/") &&
		(await kindOf(join(target, "index.html"))) === "file"
	) {
		return send(join(target, "index.html"), 200);
	}
	for (const file of [target, `${target}.html`]) {
		if ((await kindOf(file)) === "file") return send(file, 200);
	}
	return send(join(root, "404.html"), 404);
});

server.listen(port, () => {
	console.log(`Serving ${root} like GitHub Pages at http://localhost:${port}/`);
});
