const fetch = require('node-fetch');

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  description: 'TikTok Video Downloader',
  category: 'Open AI',

  async xstart(vorterx, m, { xReact, text }) {
    if (!text) {
    return m.reply('Please provide a valid TikTok video URL.');
    }

    const apiKey = '29y8XIYL';
    let caption = '';

    try {
      const downloadUrl = `https://api.botcahx.live/api/dowloader/tiktok?url=${encodeURIComponent(
      text
      )}&apikey=${apiKey}`;

      const response = await fetch(downloadUrl);
      const data = await response.json();

      if (data.success) {
       const videoDownloadLink = data.result.download_link;

        const videoTitle = data.result.title;
        const videoViews = data.result.views;
        const videoLikes = data.result.likes;
        const videoPublished = data.result.published;

        caption = `🌳TITLE: ${videoTitle}\n👀VIEWS: ${videoViews}\n👍LIKES: ${videoLikes}\n🙌PUBLISHED: ${videoPublished}`;

        m.reply(`Here is the download link for the TikTok video:\n${videoDownloadLink}\n\n${caption}`);
      } else {
        m.reply('Failed to retrieve the download link for the TikTok video.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      m.reply('An error occurred while processing the TikTok video.');
    }
   },
 };
