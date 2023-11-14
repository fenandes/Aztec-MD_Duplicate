const axios = require('axios');

module.exports = {
  name: 'fb',
  alias: ['facebook'],
  description: 'A Facebook video downloader',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, text, args }) {
    if (!text) {
      await xReact('❌');
      return m.reply('Please provide a Facebook video URL');
    }

    try {
      let response = await axios.get(`https://api.botcahx.live/api/dowloader/fbdown3?url=${text}&apikey=29y8XIYL`);

      const videoUrl = response.data.url;
      const ca_ption = `[*FB DOWNLOAD*]\n` +
        `😀 Title: ${response.data.title}\n` +
        `😀 Quality: ${response.data.selectedNumber === '1' ? '720p (HD)' : '360p (SD)'}\n` +
        `🙂 Views: ${response.data.views}\n\n` +
        `└───────────◉`;
      const msg = { video: { url: videoUrl }, caption: ca_ption };
      vorterx.sendMessage(m.from, msg);
    } catch (error) {
    console.error('Error downloading Facebook video:', error);
    m.reply('An error occurred while processing the video');
    }
    },
  };
