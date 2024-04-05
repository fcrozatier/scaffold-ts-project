import { copy, mkdir, resolvePath } from "./utils.js";

/** @type {import("./types/index.js").create} */
export async function create(cwd, options) {
	mkdir(cwd);
	copy(resolvePath("templates/base"), cwd);

	// write_common_fil<es(cwd, options, options.name);
}

// function merge(target: any, source: any) {
// 	for (const key in source) {
// 		if (key in target) {
// 			const target_value = target[key];
// 			const source_value = source[key];

// 			if (
// 				typeof source_value !== typeof target_value ||
// 				Array.isArray(source_value) !== Array.isArray(target_value)
// 			) {
// 				throw new Error("Mismatched values");
// 			}

// 			if (typeof source_value === "object") {
// 				merge(target_value, source_value);
// 			} else {
// 				target[key] = source_value;
// 			}
// 		} else {
// 			target[key] = source[key];
// 		}
// 	}
// }
