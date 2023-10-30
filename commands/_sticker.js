
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
  name: "sticker",
  alias: ["sticker", "s"],
  desc: "makes sticker from images/videos/gifs",
  category: "Utils",
  react: "✅",

  start: async (client, m, { pushName, body, quoted, mime, text, args, flags }) => {
    if (!quoted) return await client.sendMessage(m.from, { text: "Reply/tag an image/video" });

    pack = 'ETERNITY';
    author = '';

    if (/image/.test(mime)) {
      let media = await quoted.download();
      let sticker = new Sticker(media, {
        pack: pack,
        author: author,
        type: 'full',
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 75,
        background: 'transparent'
      });
      const buffer = await sticker.toBuffer();
      client.sendMessage(m.from, { sticker: buffer }, { quoted: m });
    } else if (/video/.test(mime)) {
      if ((quoted.msg || quoted).seconds > 20) {
        return client.sendMessage(m.from, { text: '🕐 Cannot fetch videos longer than *11 Seconds*' });
      }
      let media = await quoted.download();
      let sticker = new Sticker(media, {
        pack: pack,
        author: author,
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 30,
        background: 'transparent'
      });
      const stikk = await sticker.toBuffer();
      client.sendMessage(m.from, { sticker: stikk }, { quoted: m });
    } else {
      client.sendMessage(m.from, { text: "❌ Could not find any Image/Video in context" }, { quoted: m });
    }
  }
};
