const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { getBuffer } = require("../../mangoes/myFunc.js");
const fs = require("fs");
const { downloadMedia } = require("./message/_D3centX.js");
const axios = require("axios");

module.exports = {
  name: 'sticker',
  alias: ['st', 's'],
  category: 'Converctor',
  description: 'To converct image to sticker',
  async xstart (vorterx,m,{args, xReact,text}) {
   
    try {
      
      author = 'vorterx team',
        
      const content = JSON.stringify(m.quoted);
      const isMedia = m.type === 'imageMessage' || m.type === 'videoMessage';
      const isconverct = (m.type === 'extendedTextMessage' && content.includes('imageMessage')) || (m.type === 'extendedTextMessage' && content.includes('videoMessage'));

        const pack = args.split(',');
        const buffer = isconverct ? await m.quoted.download() : await m.download();
        const sticker = new Sticker(buffer, {
          pack: author,
        . type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          quality: 70
        });
        await vorterx.sendMessage(m.from,{sticker: await sticker.build()},{quoted: m});
      }
      } catch (err) {
      m.reply("An error occurred while processing");
      console.log(err);    } }
}
