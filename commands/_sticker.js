// THANKS TO RAY SENPAI

const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
  name: "sticker",
  alias: ["s"],
  description: "makes sticker",
  category: "Media",
  async xstart (vorterx, m, { body, quoted, mime, doReply,text, args, xReact }) {
    if (!quoted) { await xReact('❌'); return doReply('Reply to Something please');
     }
    await xReact('🐼');
    pack = 'VORTERX';
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
      vorterx.sendMessage(m.from, { sticker: buffer }, { quoted: m });
     } else if (/video/.test(mime)) {
     if ((quoted.msg || quoted).seconds > 20) {
     return vorterx.sendMessage(m.from, { text: '🕐 Cannot fetch videos longer than *11 Seconds*' });
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
      const stk = await sticker.toBuffer();
      vorterx.sendMessage(m.from, { sticker: stk }, { quoted: m });
     } else {
      vorterx.sendMessage(m.from, { text: "❌ Could not find any Image/Video in context" }, { quoted: m });
     }
    }
   };
