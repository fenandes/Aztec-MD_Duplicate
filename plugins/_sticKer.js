const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const axios = require("axios");

module.exports = {
  name: 'sticker',
  alias: ['s'],
  category: 'Converct',
  async xstart(vorterx, m, { args, quoted, xReact }) {
   
    try {
      if (!quoted || !quoted.imageMessage) {
        await xReact('❌');
        return m.reply('Provide an image to convert');
      }

      await xReact('⭐');
      const author = 'vorterx team';

      const imageUrl = quoted.imageMessage.imageUrl;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const stickerBuffer = response.data;

      const stickerPack = author;
      const stickerEmojis = ['🤩', '🎉'];
      const stickerOptions = { pack: stickerPack, emojis: stickerEmojis };

      await vorterx.sendMessage(m.from, { sticker: stickerBuffer, ...stickerOptions }, { quoted: m });
    } catch (err) {
      m.reply("An error occurred while processing");
      console.log(err);
    }
  }
};
