const downloadFacebookVideo = require("../lib/plugins/_facebook.js");

module.exports = {
  name: 'fb',
  alias: ['facebook'],
  description: 'A Facebook video downloader',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, text, args }) {
    await downloadFacebookVideo(vorterx, m);
  },
};
