#!/usr/bin/env node
import * as p from "@clack/prompts";
import { bold, cyan, grey } from "kleur/colors";
import fs from "node:fs";
import path from "node:path";
import { create } from "./index.js";

const { version } = JSON.parse(
	fs.readFileSync(new URL("package.json", import.meta.url), "utf-8"),
);

let cwd = process.argv[2] ?? ".";

console.log(`
${grey(`scaffold-ts-project version ${version}`)}
`);

p.intro("Welcome!");

if (cwd === ".") {
	const dir = await p.text({
		message: "Where should we create your ts project?",
		placeholder: "  (hit Enter to use current directory)",
	});

	if (p.isCancel(dir)) process.exit(1);

	if (dir) {
		cwd = dir;
	}
}

if (fs.existsSync(cwd)) {
	if (fs.readdirSync(cwd).length > 0) {
		const force = await p.confirm({
			message: "Directory not empty. Continue?",
			initialValue: false,
		});

		// bail if `force` is `false` or the user cancelled with Ctrl-C
		if (force !== true) {
			process.exit(1);
		}
	}
}

const options = await p.multiselect({
	message: "Select additional options (use arrow keys/space bar)",
	required: false,
	options: [
		{
			value: "eslint",
			label: "Add ESLint for code linting",
		},
		{
			value: "prettier",
			label: "Add Prettier for code formatting",
		},
		{
			value: "vitest",
			label: "Add Vitest for unit testing",
		},
	],
});

if (p.isCancel(options)) process.exit(1);

create(cwd, {
	name: path.basename(path.resolve(cwd)),
	eslint: options.includes("eslint"),
	prettier: options.includes("prettier"),
	vitest: options.includes("vitest"),
});

p.outro("Your project is ready! 🚀");

if (options.includes("eslint")) {
	console.log(bold("✔ ESLint"));
	console.log(cyan("  https://eslint.org/\n"));
}

if (options.includes("prettier")) {
	console.log(bold("✔ Prettier"));
	console.log(cyan("  https://prettier.io/docs/en/options.html"));
}

if (options.includes("vitest")) {
	console.log(bold("✔ Vitest"));
	console.log(cyan("  https://vitest.dev\n"));
}

console.log("\nNext steps:");
let i = 1;

const relative = path.relative(process.cwd(), cwd);
if (relative !== "") {
	console.log(`  ${i++}: ${bold(cyan(`cd ${relative}`))}`);
}

console.log(`  ${i++}: ${bold(cyan(`npm install`))} (or pnpm etc.)`);
if (options.includes("prettier")) {
	console.log(`  ${i++}: ${bold(cyan(`npm run format`))}`);
}
console.log(
	`  ${i++}: ${bold(cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)`,
);
