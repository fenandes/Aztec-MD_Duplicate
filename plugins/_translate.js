const translate = require('google-translate-api');

module.exports = {
  name: 'tr',
  alias: ['translate'],
  description: 'Translate any usable language',
  category: 'Extra',
  async xstart(vorterx, m, { text, args, xReact }) {
    if (!text) {
      await xReact('👀');
      return m.reply('Example: tr Damn l love this Diegoson eish');
    }

    let lang;
    let data;

    if (text && m.quoted && m.quoted.text) {
      lang = text.slice(0, 2);
      data = m.quoted.text;
    } else if (text) {
      lang = text.slice(0, 2);
      data = text.substring(2).trim();
    }
   
    try {
      await xReact('📝');
      const result = await translate(data, { to: lang });
      const caption = `📝Text: ${data}\n🧘Translated: ${result.text}`;
      await m.reply(caption);
    } catch (error) {
      let errorMessage = 'An error occurred while translating';
      if (error.code === 'NOT_SUPPORTED') {
        errorMessage = 'The language is not supported';
      }
      await m.reply(errorMessage);
    }
  },
};
