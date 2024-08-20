const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
try {
console.log('Started to clear application (/) commands.');

const commands = await rest.get(
Routes.applicationGuildCommands(clientId, guildId)
);

for (const command of commands) {
await rest.delete(
`${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`
);
console.log(`Deleted command ${command.name}`);
}

console.log('Successfully cleared application (/) commands.');
} catch (error) {
console.error(error);
}
})();