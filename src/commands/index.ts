import fs from "node:fs/promises";
import { Command } from "../types";

export const getCommands = async (): Promise<Command[]> => {
	const files = await fs.readdir(__dirname);
	const commands: Command[] = [];
	
	for (const file of files) {
		if (file !== "index.js" && !file.includes(".map")) {
			try {
				const module = await import(`${__dirname}/${file}`);
				const command = module.default;
				commands.push(command);
			} catch (error) {
				console.error(`Failed to import ${file}: ${error}`);
			}
		}
	}
	
	return commands;
};
