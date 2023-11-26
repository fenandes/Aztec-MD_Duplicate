const fs = require("fs");
const config = require("../config.js");
const prefix = config.prefix;

let customAliveMsg = "";

module.exports = {
  name: 'alive',
  alias: ['bot'],
  description: 'To check the bot alive or off',
  category: 'Mics',
  async xstart(vorterx, m, { text, xReact }) {
    await xReact('🧘');

    const image = {
      url: "https://i.ibb.co/BsYCSRV/Screenshot-20230918-093130.jpg",
      mimetype: "image/jpeg",
    };

    let aliveMsg = ""; 

    if (customAliveMsg) {
      aliveMsg = customAliveMsg;
    } else {
      aliveMsg = `╭─💙 *Bot Status*
│
├ Hey ${m.pushName}! 👋
├ Welcome to ${process.env.BOTNAME}! 🤖
├ Im ${process.env.BOTNAME} made by Diegoson.
├ ✨Let's embark the world together!
├
├ 📌 *Prefix*: ${prefix}
├ 📌 *Version*: 3.0.0
│
├ Use ${prefix}menu to get a list of commands.
│
╰──────────⭑

To set your own alive message, use the command:
${prefix}setalive <your message>
`;
    }

    const messageOptions = {
      image: image,
      caption: aliveMsg,
      contextInfo: {
        externalAdReply: {
          title: "Powered by Aztec",
          body: "Unleash your imagination",
          thumbnail: image,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "https://vorterx.com",
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.from, messageOptions, { quoted: m });
  },

    setalive(vorterx, m, { text }) {
    if (isCreator(m.sender)) {
      customAliveMsg = text; 
      vorterx.reply(m.from, "Custom alive message set successfully!");
    } else {
      vorterx.reply(m.from, "Sorry, you are not authorized to set the custom alive message.");
    }
  },
};
function isCreator(user) {
  const creator = process.env.MODS;
  return user === creator;
    }
