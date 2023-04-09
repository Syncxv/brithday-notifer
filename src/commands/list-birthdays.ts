import { getData } from "../db";
import { Command } from "../types";

const ListBrithdays: Command = {
	name: "list-birthdays",
	description: "List all birthdays",
	execute: async (e) => {
		const data = await getData();
		const birthdays = data.birthdays;

		for (let [key, value] of Object.entries(birthdays)) {
			console.log(`${key}: ${value}`);
		}

		e.reply("hi");
	},
};

export default ListBrithdays;
