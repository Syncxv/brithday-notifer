import { ApplicationCommandData, CommandInteraction } from "discord.js";

export type Command = ApplicationCommandData & {
	execute: (interaction: CommandInteraction) => Promise<any>;
};

export interface Birthdays {
	birthdays: { [key: string]: string | number | Date };
}
