import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** @param {string} dir */
export function mkdir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

/**
 * @param {string} from
 * @param {string} to
 */
export function copy(from, to) {
	if (!fs.existsSync(from)) return;

	const stats = fs.statSync(from);

	if (stats.isDirectory()) {
		fs.readdirSync(from).forEach((file) => {
			copy(path.join(from, file), path.join(to, file));
		});
	} else {
		mkdir(path.dirname(to));
		fs.copyFileSync(from, to);
	}
}

/** @param {string} path */
export function resolvePath(path) {
	return fileURLToPath(new URL(path, import.meta.url).href);
}
