import { browser } from "$app/env";

const remove = (key) => {
	if (!browser) return;
	localStorage.removeItem(key);
};

const set = (key, value) => {
	if (!browser) return;
	localStorage.setItem(key, value);
};

const get = (key) => {
	if (!browser) return;
	const value = localStorage.getItem(key);
	if (["undefined", "null", ""].includes(value)) return undefined;
	else if (value === "false") return false;
	else if (value === "true") return true;
	return value;
};

export default {
	set,
	get,
	remove,
};
