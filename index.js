import fs from "node:fs";
import { versions } from "./config.js";
import { copy, mkdir, resolvePath } from "./utils.js";

/** @type {import("./types/index.js").create} */
export function create(cwd, options) {
	mkdir(cwd);
	copy(resolvePath("templates/base"), cwd);

	const packages = JSON.parse(fs.readFileSync(cwd + "/package.json", "utf-8"));
	packages.name = options.name;

	if (options.vitest) {
		packages.devDependencies["vitest"] = versions.vitest;
		packages.scripts["test"] = "vitest";
	}

	if (options.prettier) {
		packages.devDependencies["prettier"] = versions.prettier;
		packages.scripts["format"] = "prettier --write .";
		copy(resolvePath("templates/prettier"), cwd);
	}

	if (options.eslint) {
		const dependencies = /** @type {const} */ ([
			"eslint",
			"@typescript-eslint/eslint-plugin",
			"@typescript-eslint/parser",
		]);
		for (const dependency of dependencies) {
			packages.devDependencies[dependency] = versions[dependency];
		}

		if (options.prettier) {
			packages.devDependencies["eslint-config-prettier"] =
				versions["eslint-config-prettier"];
			packages.scripts["lint"] = "prettier --check . && eslint .";
		} else {
			packages.scripts["lint"] = "eslint .";
		}

		copy(resolvePath("templates/eslint"), cwd);
	}

	fs.writeFileSync(cwd + "/package.json", JSON.stringify(packages));
}
