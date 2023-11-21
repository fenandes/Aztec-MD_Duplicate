const downloadTikTokVideo = require("./path/to/downloadTikTokVideo.js");

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  description: 'TikTok Video Downloader',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, text }) {
    await xReact("📤");
    await downloadTikTokVideo(vorterx, m);
  },
};
