//BY VORTERX
//@DiegosonTech

module.exports = {
  name: "gpt",
  alias: ["ai", "openai", "chatgpt"],
  category: "CHATGPT",
  description: "Randomly search",
  async xstart(vorterx, m, { text, xReact, args }) {
    if (!text) {
      await xReact('❌');
      return m.reply(`*Provide me a query ex who made Aztec*`);
    }

    try {
      const fetch = await import('node-fetch');
      const response = await fetch.default(
        `https://xzn.wtf/api/openai?text=${encodeURIComponent(text)}&apikey=aztec`
      );
      const result = await response.json();
      const aiTurbo = result.result;

      const externalAdReply = {
        title: 'GPT TURBO 3.5K',
        mediaType: 1,
        mediaUrl: '',
        sourceUrl: '',
        showAdAttribution: true,
        thumbnail: 'https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png',
        renderLarger: true,
      };

      await m.reply(`*👤USER*: ${text}\n\n*🌳AZTEC GPT RESULTS ARE*: ${aiTurbo}`, {
        contextInfo: { externalAdReply },
      });
    } catch (error) {
      console.error(error);
      await m.reply('An error occurred while processing the request.');
    }
  },
};
