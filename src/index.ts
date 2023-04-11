import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { getCommands } from "./commands";
dotenv.config();

const { TOKEN } = process.env;

export const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const rest = new REST({ version: "9" }).setToken(TOKEN!);

const main = async () => {
	const commands = await getCommands();
	client.on("ready", async () => {
		console.log(`Logged in as ${client.user!.tag}!`);
		rest
			.put(Routes.applicationCommands(client.user!.id), {
				body: commands,
			})
			.catch((err) => console.error(err));
	});
	client.on("interactionCreate", async (interaction) => {
		if (interaction.isCommand()) {
			const command = commands.find(
				(cmd) => cmd.name === interaction.commandName
			);
			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	});
//easter egg
	client.login(TOKEN!);
};

main().catch((err) => console.error(err));
