const axios = require('axios');

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  description: 'To download tiktok videos',
  category: 'Downloads',
  async xstart(vorterx, m, { text, args, xReact }) {
    
    if (!text) {
      await xReact('❌');
      return m.reply('Please provide a valid TikTok video URL.');
    }

    const apiKey = '29y8XIYL';
    let caption = '';

    try {
      const downloadUrl = `https://api.botcahx.live/api/dowloader/tiktok?url=${encodeURIComponent(
        text
      )}&apikey=${apiKey}`;

      await xReact('📤');
      const response = await axios.get(downloadUrl);
      const data = response.data;

      if (data.success) {
        const videoTitle = data.result.title;
        const videoViews = data.result.views;
        const videoLikes = data.result.likes;
        const videoPublished = data.result.published;

        caption = `🌳TITLE: ${videoTitle}\n👀VIEWS: ${videoViews}\n👍LIKES: ${videoLikes}\n🙌PUBLISHED: ${videoPublished}`;

        vorterx.sendMessage(m.from, `${caption}`);
      } else {}
    } catch (error) {
      console.error('An error occurred:', error);
      m.reply('An error occurred while processing the TikTok video');
    }
  }
};
