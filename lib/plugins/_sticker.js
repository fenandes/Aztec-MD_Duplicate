const { Sticker, StickerTypes } = require('wa-sticker-formatter');
let { getBuffer } = require("../lib/function");
let { TelegraPh } = require("../lib/uploader");
const fs = require("fs");
let { downloadMedia } = require("../CONNECTION/waconnect");
const axios = require("axios");

module.exports = {
  name: 'stickers',
  alias: ['sticker', 's'],
  category: 'utils',
  description: 'sticker [caption/quote message containing media] <pack> | <author>',
  async execute(dsan, arg, M) {
    try {
      const author = process.env.AUTHOR || M.pushName;
      const package = process.env.PACKAGE || "DSAN";
      
      const content = JSON.stringify(M.quoted);
      const isMedia = M.type === 'imageMessage' || M.type === 'videoMessage';
      const isQuoted =
        (M.type === 'extendedTextMessage' && content.includes('imageMessage')) ||
        (M.type === 'extendedTextMessage' && content.includes('videoMessage'));

      if (isMedia || isQuoted) {
        M.reply("Please wait...");
        const pack = arg.split(',');
        const buffer = isQuoted ? await M.quoted.download() : await M.download();
        const sticker = new Sticker(buffer, {
          pack: pack[0] ? pack[0].trim() : package,
          author: pack[1] ? pack[1].trim() : author,
          type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          quality: 70
        });
        await dsan.sendMessage(
          M.from,
          {
            sticker: await sticker.build()
          },
          {
            quoted: M
          }
        );
      }
    } catch (err) {
      M.reply("An error occurred!");
      console.log(err);
    }
  }
}
