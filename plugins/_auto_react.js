const config = require('../config.js');

module.exports = {
  async xstart(vorterx, m, { xReact }) {
   
    const envPrefix = process.env.PREFIX;
    if (process.env.AUTO_REACT) {
      const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋'];
      const done_React = (process.env.AUTO_REACT === 'on');
      
      if (done_React && m.text.startsWith(envPrefix)) {
        const time_toReact = emojis[Math.floor(Math.random() * emojis.length)];
        await vorterx.sendMessage(m.from, time_toReact);
      } }
  }
};
