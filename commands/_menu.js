const path = require('path');
const fs = require('fs');

module.exports = {
  name: 'menu',
  alias: ['help'],
  category: 'General',
  description: 'Gives the full command list of the bot',
  async xstart(vorterx, m, { args, xReact, text }) {
    const BotName = process.env.BOTNAME;
    const userName = m.pushname;
    const PREFIX = process.env.PREFIX;

    await xReact('Ⓜ️');
    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
      .split(",");
    try {
      await vorterx.sendPresenceUpdate("composing", m.from);
      const id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;

      const getUniquecommands = (dirPath) => {
        const files = fs.readdirSync(dirPath);
        const subDirs = files.filter((file) => fs.statSync(path.join(dirPath, file)).isDirectory());
        const commands = subDirs.map((subDir) => {
          const nestedCommands = getUniquecommands(path.join(dirPath, subDir));
          return nestedCommands;
        });
        return [].concat(...commands, files.filter((file) => file.endsWith(".js")));
      };

      const formatcommandList = (commands) => {
        let formatted = "";
        for (const [file, ...aliases] of commands) {
        var up_up, up_mid, up_btm, ctgry_L, ctgry_R, cmd_L, ctgry_end;
      
        // code omitted for brevity
      };

      const pluginsDir = path.join(process.cwd(), "commands");
      const uniquecommands = getUniquecommands(pluginsDir);
      const formattedcommandList = formatcommandList(uniquecommands);

      let up_up = "";
      
      let random_menu = 0;
      if (!process.env.MENU) {random_menu = Math.floor(Math.random() * 2) + 1; // Replace '2' with the exact number of styles you have added
      }

      if (
        random_menu === 1 ||
        process.env.MENU.trim().startsWith("1") ||
        process.env.MENU.toLowerCase().includes("suhail-md")
      ) {
        up_up = `╭────《  *${BotName}*  》────⊷\n│ ╭──────✧❁✧──────◆`;
        up_mid = `│`;
        up_btm = `│ ╰──────✧❁✧──────◆\n╰══════════════════⊷`;
        ctgry_L = `╭────❏`;
        ctgry_R = `❏ \n`;
        cmd_L = `│`;
        ctgry_end = `\n╰━━━━━━━━━━━━━━──⊷`;
       
        // code omitted for brevity
      } else {
        up_up = `┏━━⟪ *${BotName}* ⟫━━⦿`;
        up_mid = `┃ ✗`;
        up_btm = `┗━━━━━━━━━━━━━━⦿`;
        ctgry_L = `\n┌──『`;
        ctgry_R = `』──❖\n\n`;
        cmd_L = ` | `;
        ctgry_end = `\n\n└─────────◉\n`;
        // code omitted for brevity
      }
        const capitalizedFile =
        file.replace(".js", "").charAt(0).toUpperCase() +
        file.replace(".js", "").slice(1);
        const aliasesList = aliases.map((cmd) => `${cmd_L} ${PREFIX}${cmd}`).join("\n");

        formatted += `${ctgry_L} *${capitalizedFile}* ${ctgry_R}\n\n`;
        formatted += `\`\`\`${aliasesList}\`\`\`${ctgry_end}\n`;
        }
        return formatted.trim();
        };
          

      let vorterxInstant = `${up_up}
${up_mid} User: ${userName}
${up_mid} BotName: ${BotName}
${up_mid} Prefix: ${PREFIX}
${up_mid} Time: ${time}
${up_mid} Date: ${date}
${up_btm}\n${formattedcommandList}`;

      vorterxInstant += `_📔Send ${PREFIX}menu <command name> to get detailed information of a specific command_`;

      await vorterx.sendMessage(m.from, { caption: vorterxInstant }, { quoted: m });
    } catch (err) {
      m.reply("👮‍♂️Oops! Something went wrong. Please try again later.");
      console.log(err, 'red');
    }
  }
};
