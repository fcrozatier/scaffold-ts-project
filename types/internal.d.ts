export type Options = {
	name: string;
	prettier: boolean;
	eslint: boolean;
	vitest: boolean;
};

export type File = {
	name: string;
	contents: string;
};

export type Condition =
	| "eslint"
	| "prettier"
	| "typescript"
	| "checkjs"
	| "playwright"
	| "vitest"
	| "skeleton"
	| "default"
	| "skeletonlib"
	| "svelte5";

export type Common = {
	files: Array<{
		name: string;
		include: Condition[];
		exclude: Condition[];
		contents: string;
	}>;
};
