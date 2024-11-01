const fs = require('fs');
const path = require('path');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'help',
  description: 'Show available commands',
  author: '𝐌𝐀𝐑𝐉𝐇𝐔𝐍 𝐁𝐀𝐘𝐋𝐎𝐍',
  
  execute(senderId, args, pageAccessToken) {
    const commandsDir = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    const commands = commandFiles.map((file) => {
      const command = require(path.join(commandsDir, file));
      return {
        title: command.name,
        description: command.description,
        payload: `${command.name.toUpperCase()}_PAYLOAD`
      };
    });

    const totalCommands = commandFiles.length;
    const commandsPerPage = 5;
    const totalPages = Math.ceil(totalCommands / commandsPerPage);
    let page = parseInt(args[0], 10);

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    if (args[0] && args[0].toLowerCase() === 'all') {
      const helpTextMessage = `𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐋𝐈𝐒𝐓\n━━━━━━━━━━━━━━━━━\n📕 𝐀𝐥𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${totalCommands}\n\n${commands.map((cmd, index) => `➯ 《 ${cmd.title} 》 - ${cmd.description}`).join('\n')}\n\n🛠️ 𝐂𝐫𝐞𝐝𝐢𝐭𝐬: 𝙼𝚊𝚛𝚓𝚑𝚞𝚗 𝙱𝚊𝚢𝚕𝚘𝚗`;
      return sendMessage(senderId, { text: helpTextMessage }, pageAccessToken);
    }

    const startIndex = (page - 1) * commandsPerPage;
    const endIndex = startIndex + commandsPerPage;
    const commandsForPage = commands.slice(startIndex, endIndex);

    if (commandsForPage.length === 0) {
      return sendMessage(senderId, { text: `Invalid page number. There are only ${totalPages} pages.` }, pageAccessToken);
    }

    const helpTextMessage = `𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐋𝐈𝐒𝐓 (𝐏𝐚𝐠𝐞 ${page} 𝐨𝐟 ${totalPages})\n━━━━━━━━━━━━━━━━━\n📕 𝐀𝐥𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${totalCommands}\n\n${commandsForPage.map((cmd, index) => `➯ 《 ${cmd.title} 》 - ${cmd.description}`).join('\n\n')}\n\nType "help [page]" to see another page, or "help all" to show all commands.\n\n🛠️ 𝐂𝐫𝐞𝐝𝐢𝐭𝐬: 𝙼𝚊𝚛𝚓𝚑𝚞𝚗 𝙱𝚊𝚢𝚕𝚘𝚗`;

    const quickRepliesPage = commandsForPage.map((cmd) => ({
      content_type: "text",
      title: cmd.title,
      payload: cmd.payload
    }));

    sendMessage(senderId, {
      text: helpTextMessage,
      quick_replies: quickRepliesPage
    }, pageAccessToken);
  }
};
