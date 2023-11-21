const convertToSticker = require("../lib/plugins/_sticker.js");

module.exports = {
  name: 'sticker',
  alias: ['st', 's'],
  category: 'Converctor',
  description: 'Converts an image to a sticker',
  async xstart(vorterx, m, { args, quoted, xReact }) {
    await convertToSticker(vorterx, m);
  },
};
