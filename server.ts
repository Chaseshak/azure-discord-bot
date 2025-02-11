import 'dotenv/config';
import { REST, Routes, Client, GatewayIntentBits, Events } from 'discord.js'

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN) {
  throw new Error("Missing TOKEN in env variables!");
}

if (!CLIENT_ID) {
  throw new Error("Missing CLIENT_ID in env variables!");
}

const commands = [
  {
    name: 'ping',
    description: 'Replies with pong!',
  },
];

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');

  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

// Create and configure the Discord Client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

// Listen for interactions (slash commands)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Handle the /ping command
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// Main startup
(async function main() {
  // 1. Register slash commands (important to do this at least once)
  await registerCommands();

  // 2. Log in to Discord
  await client.login(TOKEN);
})();

