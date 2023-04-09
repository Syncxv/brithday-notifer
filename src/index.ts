// import { Routes } from "discord-api-types/v9";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN } = process.env;

export const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// const rest = new REST({ version: "9" }).setToken(TOKEN!);

const main = async () => {
	client.on("ready", async () => {
		console.log(`Logged in as ${client.user!.tag}!`);
		// await inviteManager.initalize(client)
		// rest.put(Routes.applicationCommands(client.user!.id), {
		//     body: commands
		// }).catch(err => console.error(err))
	});
	client.on("interactionCreate", async (interaction) => {
		if (interaction.isCommand()) {
			console.log(interaction);
		}
	});

	client.login(TOKEN!);
};

main().catch((err) => console.error(err));
