//==============

// MDE WITH LUV BY DIEGOSON 

//================

const fs = require("fs");
const config = require('../config.js');
const BOTNAME = config.botName;
const PREFIX = config.prefix;
const { aztec_images } = require('../mangoes/encryptFunc.js');

module.exports = {
  name: 'alive',
  category: 'General',
  description: 'Check if the bot is online',
  async xstart(vorterx, m, { args, xReact,text }) {
    
    await xReact("💙");
    const image = fs.readFileSync('./lib/imogs.jpg');
    const userName = m.pushName;
    const botName = process.env.BOTNAME;
    const version = ${require("../package.json").version};

    const cap = `
    ╭─💙 *Bot Status*
    │
    ├ Hey ${userName}! 👋
    ├ Welcome to ${botName}! 🤖
    ├ I am a WhatsApp user bot developed by Diegoson.
    ├ ✨ Let's embark the world of automation together!
    ├
    ├ 📌 *Prefix*: ${PREFIX}
    ├ 📌 *Version*: ${version}
    │
    ├ Type ${PREFIX}menu toget my cmds.
    │
    ╰──────────⭑ ©vorterx
    `;

    const messageOptions = {
      image: { url: await aztec_images()},
      caption: cap,
      contextInfo: {
        externalAdReply: {
          title: 'Powerd by Aztec',
          body: 'Unlash your imagination',
          thumbnail: image,
          mediaType: 1,
          mediaUrl: '',
          sourceUrl: 'https://vorterx.com',
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.from, messageOptions, { quoted: m });
  },
};
