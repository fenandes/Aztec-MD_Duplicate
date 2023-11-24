const path = require("path");
const config= require('../config.js');
const fs = require("fs");

const PREFIX = process.env.PREFIX;
function readUniqueCommands(dirPath) {
  const allCommands = [];

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
    const subCommands = readUniqueCommands(filePath);
    allCommands.push(...subCommands);
    } else if (stat.isFile() && file.endsWith(".js")) {
    const command = require(filePath);

   if (Array.isArray(command.alias)) {
   const subArray = [file, ...command.alias];
   allCommands.push(subArray);
    } }
  }

  return allCommands;
}

function formatCommands(allCommands) {
  let formatted = "";

  for (const [file, ...commands] of allCommands) {
    const capitalizedFile =
      file.replace(".js", "").charAt(0).toUpperCase() +
      file.replace(".js", "").slice(1);

    formatted += `╟   🏮 *${capitalizedFile}* 🏮   ╢\n\n`;
    formatted += `\`\`\`${commands
      .map((cmd) => `⥼   ${PREFIX + cmd}`)
      .join("\n")}\`\`\`\n\n\n`;
  }

  return formatted.trim();
 }

module.exports = {
  name: 'menu',
  alias: ['h', 'help'],
  category: 'General',
  description: 'Reveals menu categories commands',

  async xstart(vorterx, m, { text, args, xReact }) {
    
    await xReact('🏋️');
     try {
      await vorterx.sendPresenceUpdate("composing", m.from);

      let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
      console.log(id);

      const pluginsDir = path.join(process.cwd(), "plugins");
      const allCommands = readUniqueCommands(pluginsDir);
      const formattedCommands = formatCommands(allCommands);
      
      var helpText = `\nKonnichiwa *${m.pushName}* Senpai,\n\nI am *DSAN*, a WhatsApp bot built to take your boring WhatsApp experience to the next level.\n\n*🔖 My Prefix is:*  ${PREFIX}\n\n${formattedCommands}\n\n\n*©️ Team ATLAS- 2023*`;

      await vorterx.sendMessage(m.from, {
        image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: helpText }, { quoted: m });
      } catch (err) {
      m.reply(err.toString());
      console.log(err, 'red');
    }}
};
