const { REST, Routes, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

console.log('Environment Variables:', process.env);

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
console.error('Missing required environment variables (TOKEN, CLIENT_ID, GUILD_ID). Please check your config.env file.');
process.exit(1);
}

const commands = [
/**
* Command: ban
*/
new SlashCommandBuilder()
.setName('ban')
.setDescription('Cấm một người dùng khỏi máy chủ.')
.addUserOption(option =>
option.setName('user')
.setDescription('Người dùng cần cấm')
.setRequired(true))
.addStringOption(option =>
option.setName('reason')
.setDescription('Lý do cấm')
.setRequired(false))
.toJSON(),

/**
* Command: unban
*/
new SlashCommandBuilder()
.setName('unban')
.setDescription('Gỡ cấm một người dùng khỏi máy chủ.')
.addStringOption(option =>
option.setName('userid')
.setDescription('ID của người dùng cần gỡ cấm')
.setRequired(true))
.toJSON(),

/**
Command: mute
*/
new SlashCommandBuilder()
.setName('mute')
.setDescription('Cấm nói một người dùng trong một khoảng thời gian.')
.addUserOption(option =>
option.setName('user')
.setDescription('Người dùng cần cấm nói')
.setRequired(true))
.addIntegerOption(option =>
option.setName('duration')
.setDescription('Thời gian cấm nói (phút)')
.setRequired(true))
.addStringOption(option =>
option.setName('reason')
.setDescription('Lý do cấm nói')
.setRequired(false))
.toJSON(),

/**
Command: unmute
*/
new SlashCommandBuilder()
.setName('unmute')
.setDescription('Gỡ cấm nói của một người dùng.')
.addUserOption(option =>
option.setName('user')
.setDescription('Người dùng cần gỡ cấm nói')
.setRequired(true))
.toJSON(),

/**
Command: strike
*/
new SlashCommandBuilder()
.setName('strike')
.setDescription('Gửi cảnh cáo đến một người dùng.')
.addUserOption(option =>
option.setName('user')
.setDescription('Người dùng cần cảnh cáo')
.setRequired(true))
.addStringOption(option =>
option.setName('reason')
.setDescription('Lý do cảnh cáo')
.setRequired(false))
.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
try {
console.log('Bắt đầu làm mới lệnh ứng dụng (/)');

await rest.put(
Routes.applicationGuildCommands(clientId, guildId),
{ body: commands }
);

console.log('Đã làm mới thành công lệnh ứng dụng (/)');
} catch (error) {
console.error(error);
}
})();