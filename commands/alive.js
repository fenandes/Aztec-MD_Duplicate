//==============
// MADE WITH LUV BY DIEGOSON
//================

const fs = require("fs");
const path = require("path");
const config = require("../config.js");
const BOTNAME = config.botName;
const prefix = config.prefix;
const { aztec_images } = require("../mangoes/encryptFunc.js");

module.exports = {
  name: "alive",
  category: "General",
  description: "Check if the bot is online",
  async xstart(vorterx, m, { args, xReact, text }) {
    await xReact("💙");
    
    const image = {
      url: "https://i.ibb.co/BsYCSRV/Screenshot-20230918-093130.jpg",
      mimetype: "image/jpeg",
    };
    
    const cap = `╭─💙 *Bot Status*
│
├ Hey ${m.pushName}! 👋
├ Welcome to ${process.env.BOTNAME}! 🤖
├ Im ${process.env.BOTNAME} made by Diegoson.
├ ✨Let's embark the world together!
├
├ 📌 *Prefix*: ${prefix}
├ 📌 *Version*: 3.0.0
│
├ use${prefix}menu tget cmds.
│
╰──────────⭑
    `;

    const messageOptions = {
      image: image,
      caption: cap,
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
};
