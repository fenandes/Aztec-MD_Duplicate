const { imgur } = require('../lib/_imgur.js');

module.exports = {
  name: 'url',
  category: 'Convert',
  description: 'Convert image to Imgur-like link',
  async start(vorterx, m, { text, quoted, mime, args }) {
    
    if (text.toLowerCase() !== 'url') {
      await xReact('❌');
      return m.reply('_Please reply to an image with the command "url"._');
    }

    if (mime.startsWith('image/')) {
      const imageUrl = quoted ? quoted.url : m.url;
      const isImage = imageUrl.match(/\.(jpeg|jpg|gif|png)$/);

      if (isImage) {
        await xReact('✔️');
        const imgurLink = `https://i.imgur.com/${generateRandomString(7)}.jpg`;
        vorterx.sendMessage(m.from, { url: imgurLink });
      } else {
        m.reply('_The provided URL is not a valid image._');
      }
    } else {
      m.reply('_Please provide an image._');
    }
  },
};
