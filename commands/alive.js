//==============

// MDE WITH LUV BY DIEGOSON 

//================

const fs = require("fs");
const path = require("path");
const config = require('../config.js');
const BOTNAME = config.botName;
const prefix = config.prefix;
const { aztec_images } = require('../mangoes/encryptFunc.js');

module.exports = {
  name: 'alive',
  category: 'General',
  description: 'Check if the bot is online',
  async xstart(vorterx, m, { args, xReact, text }) {

    await xReact("💙");
    //const imagePath = path.join(__dirname, "./lib/imogs.jpg");
    const image = config.thumb;
    //const userName = m.pushName;
    //const botName = process.env.BOTNAME;
  
    const cap = `
    ╭─💙 *Bot Status*
    │
    ├ Hey ${m.pushName}! 👋
    ├ Welcome to ${process.env.BOTNAME}! 🤖
    ├ I am a WhatsApp user bot developed by Diegoson.
    ├ ✨ Let's embark the world of automation together!
    ├
    ├ 📌 *Prefix*: ${prefix}
    ├ 📌 *Version*: 3.0.0
    │
    ├ Type ${prefix}menu to get my commands.
    │
    ╰──────────⭑ ©vorterx
    `;

    const messageOptions = {
      image: { url: await aztec_images() },
      caption: cap,
      contextInfo: {
        externalAdReply: {
          title: 'Powered by Aztec',
          body: 'Unleash your imagination',
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
