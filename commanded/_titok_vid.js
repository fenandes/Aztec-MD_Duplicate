const downloadTikTokVideo = require("./path/to/downloadTikTokVideo.js");

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  description: 'TikTok Video Downloader',
  category: 'Downloads',
  async xstart(vorterx, m) {
  
    await downloadTikTokVideo(vorterx, m);
  },
};
