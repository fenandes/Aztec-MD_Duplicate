const { getDevice } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'device',
  description: 'Check the user device being used',
  async xstart(vorterx, m, { quoted }) {
   
    try {
      await xReact('❌');
      if (!quoted && !m.mentionedJid) {
      return m.reply('_Please reply to someone to get their device information._');
      }

      await xReact('📱');
      const deviceId = quoted ? quoted.id : m.key.id;
      const deviceInfo = await getDevice(deviceId);
      const userMention = `USER: @${m.mentionedJid || m.sender.id}`;
      const userNumber = `NUMBER: ${m.sender.number}`;
      const device = `DEVICE: ${deviceInfo}`;
      
      const replyMsg = `${userMention}\n${userNumber}\n${device}`;
      m.reply(replyMsg);
    } catch (error) {
      console.error(error);
      m.reply('_An error occurred while retrieving device information._');
    }
  }
};
