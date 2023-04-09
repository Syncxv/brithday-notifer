import fs from "node:fs/promises";
import path from "node:path";
import { Birthdays } from "./types";
export const getData = async (): Promise<Birthdays> => {
	const text = await fs.readFile(
		path.resolve(__dirname, "..", "state.json"),
		"utf-8"
	);
	console.log(text);
	return JSON.parse(text) as Birthdays;
};

export const setData = (data: Birthdays) =>
	fs.writeFile(
		path.resolve(__dirname, "..", "state.json"),
		JSON.stringify(data),
		"utf-8"
	);
