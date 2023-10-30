//================================>

// AZTEC MD V3.0.0

// MADE WITH LUV INFORMAL OF LEARNING JS

//================================>
const axios = require("axios");
const yts = require('yts-search');

module.exports = {
  name: 'yts',
  description: 'To search anything',
  category: 'Downloads',
  async xstart(vorterx, m, { xReact, doReply, text, args }) {
    if (!text) {
    await toReact('⛔');
    return m.reply('*Provide a query example how to create Aztec*');
    }

    await xReact('🔍');
      try {
      const results = await yts(text);
      const videos = results.videos.slice(0, 15);
      if (videos.length === 0) {
      await xReact('❌');
      return m.reply('No YouTube videos found for the given query.');
      }

      let response = '';
      if (videos.length > 0) {
        response = videos.map((video, index) => {
        const searchIndex = index + 1;
        return `🔎 Search: ${searchIndex}\n\n` +
            `📽️ TITLE: ${video.title}\n` +
            `👁️ VIEWS: ${video.views}\n` +
            `⌛ DURATION: ${video.timestamp}\n` +
            `📅 UPLOADED: ${video.ago}\n` +
            `🔗 LINK: ${video.url}\n\n`;
        }).join('');
      }

      const thumbnailUrl = videos[0].thumbnail;
      vorterx.sendMessage(m.from, { image: { url: thumbnailUrl }, caption: response }, { quoted: m });
    } catch (error) {
      console.error(error);
      await xReact('❌');
      m.reply('An error occurred while performing the YouTube search.');
     }
    },
   };
