module.exports = {
  name: 'status',
  alias: ['sx'],
  category: 'Mics',
  async xstart(vorterx, m, { text, args, xReact }) {
    const uptime = process.uptime();
    const startTime = Date.now();
    const version = '1.0.0';
    const owner = process.env.OWNER_NAME;
    const additionalInfo = 'Just do what is the best: time 🏇';

    const ter = `
*🌟Description:* A WhatsApp bot with rich features built in Node.js to enhance your WhatsApp experience.
*⚡Speed:* Calculating...
*🚦Uptime:* Calculating...
*🕸Version:* ${version}
*👤Owner:* ${owner}
*ℹ️Additional Info:* ${additionalInfo}`;

    const messageOptions = {
      contentText: ter,
      footerText: 'Bot Status',
    };

    const sentMessage = await vorterx.sendMessage(m.from, messageOptions, 'textMessage');

    const endTime = Date.now();
    const latency = endTime - startTime;
    const uptimeText = getUptimeText(uptime);

    const AztecBot = `
*〄_Description:* A WhatsApp bot with rich features built in Node.js to enhance your WhatsApp experience.
*〄_Speed:* ${latency} ms
*〄_Uptime:* ${uptimeText}
*〄_Version:* ${version}
*〄_Owner:* ${owner}
*〄_Additional Info:* ${additionalInfo}`;

    const updatedMessageOptions = {
      contentText: AztecBot,
      footerText: 'Bot Status',
    };

    await vorterx.updateMessage(sentMessage.key.remoteJid, sentMessage.key.id, updatedMessageOptions, 'extendedTextMessage');
  },
};

function getUptimeText(uptime) {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}
