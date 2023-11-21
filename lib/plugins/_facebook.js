const axios = require('axios');

async function downloadFacebookVideo(vorterx, m, { xReact, text, args }) {
  if (!text) {
    await xReact('❌');
    return m.reply('Please provide a Facebook video URL');
  }

  try {
    let response = await axios.get(`https://api.botcahx.live/api/dowloader/fbdown3?url=${text}&apikey=29y8XIYL`);

    const videoUrl = response.data.url;
    const caption = `[*FB DOWNLOAD*]\n` +
      `😀 Title: ${response.data.title}\n` +
      `😀 Quality: ${response.data.selectedNumber === '1' ? '720p (HD)' : '360p (SD)'}\n` +
      `🙂 Views: ${response.data.views}\n\n` +
      `└───────────◉`;
    const message = { video: { url: videoUrl }, caption: caption };
    vorterx.sendMessage(m.from, message);
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    m.reply('An error occurred while processing the video');
  }
}

module.exports = downloadFacebookVideo;
