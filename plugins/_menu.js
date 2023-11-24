const path = require("path");
const config = require('../config.js');
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
      }
    }
  }

  return allCommands;
}

function formatCommands(allCommands) {
  let formatted = "";

  for (const [file, ...commands] of allCommands) {
    const capitalizedFile =
      file.replace(".js", "").charAt(0).toUpperCase() +
      file.replace(".js", "").slice(1);
    let up_up, up_mid, up_btm, ctgry_L, ctgry_R, cmd_L, ctgry_end;
    let random_menu = 0;
    if (!process.env.MENU) {
      random_menu = Math.floor(Math.random() * 2) + 1;
    }

    if (
      random_menu == 1 ||
      process.env.MENU.trim().startsWith("1") ||
      process.env.MENU.toLowerCase().includes("suhail-md")
    ) {
      up_up = `╭────《  *${tiny(process.env.BOTNAME)}*  》────⊷\n│ ╭──────✧❁✧──────◆`;
      up_mid = `│`;
      up_btm = `│ ╰──────✧❁✧──────◆\n╰══════════════════⊷`;
      ctgry_L = `╭────❏`;
      ctgry_R = `❏ \n`;
      cmd_L = `│`;
      ctgry_end = `\n╰━━━━━━━━━━━━━━──⊷`;
    } else {
      up_up = `┏━━⟪ *${tiny(process.env.BOTNAME)}* ⟫━━⦿`;
      up_mid = `┃ ✗`;
      up_btm = `┗━━━━━━━━━━━━━━⦿`;
      ctgry_L = `\n┌──『`;
      ctgry_R = `』──❖\n\n`;
      cmd_L = ` | `;
      ctgry_end = `\n\n└─────────◉\n`;
    }
    const aliasesList = aliases
       .map((cmd) => `${cmd_L} ${PREFIX}${cmd}`)
       .join("\n");
    formatted += `${ctgry_L} *${capitalizedFile}* ${ctgry_R}\n\n`;
    formatted += `\`\`\`${aliasesList}\`\`\`${ctgry_end}\n`;
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

      let amarok = `${up_up}
${up_mid} User: ${tiny(m.pushName)}
${up_mid} Botname: ${tiny(process.env.BOTNAME)}
${up_mid} Prefix: ${tiny(process.env.PREFIX)}
${up_mid} Runtime: ${tiny(runtime(process.uptime()))}
${up_mid} Time: ${tiny(time)}
${up_mid} Date: ${tiny(date)}
${up_btm}\n\n${formattedCommands}`;

      await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: amarok }, { quoted: m });
    } catch(err) {
      m.reply(err.toString());
      console.log(err, 'red');
    }
  }
};
