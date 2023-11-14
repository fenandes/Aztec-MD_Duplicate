const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { getBuffer } = require("../../mangoes/myFunc.js");
const fs = require("fs");
const { downloadMedia } = require("./message/_D3centX.js");
const axios = require("axios");

module.exports = {
  name: 'sticker',
  alias: ['st', 's'],
  category: 'Converctor',
  description: 'Converts an image to a sticker',
  async xstart(vorterx, m, { args, quoted, xReact }) {
    try {
      if (!quoted) {
        await xReact('❌');
        return m.reply('Provide an image to convert');
      }

      await xReact('⭐');
      const author = 'vorterx team';

      const content = JSON.stringify(quoted);
      const isMedia = m.type === 'imageMessage' || m.type === 'videoMessage';
      const isConvert = (m.type === 'extendedTextMessage' && content.includes('imageMessage')) || (m.type === 'extendedTextMessage' && content.includes('videoMessage'));

      const pack = args.split(',');
      const buffer = isConvert ? await quoted.download() : await m.download();

      const stickerOptions = {
        pack: author,
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        quality: 70
      };
      const sticker = new Sticker(buffer, stickerOptions);

      await vorterx.sendMessage(m.from, { sticker: await sticker.build() }, { quoted: m });
    } catch (err) {
      m.reply("An error occurred while processing");
      console.log(err); }  }
};
