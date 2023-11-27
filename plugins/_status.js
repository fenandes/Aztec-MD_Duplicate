//
module.exports = {
  name: 'status',
  async xstart(vorterx, m, { text, args, xReact }) {
    const uptime = process.uptime();
    const startTime = Date.now();
    const version = '1.0.0';
    const owner = 'John Doe';
    const additionalInfo = 'Additional information about the bot.';

    const ter = `🔰 *${tlang().title}* 🔰
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

    const updatedTer = `🔰 *${tlang().title}* 🔰
*🌟Description:* A WhatsApp bot with rich features built in Node.js to enhance your WhatsApp experience.
*⚡Speed:* ${latency} ms
*🚦Uptime:* ${uptimeText}
*🕸Version:* ${version}
*👤Owner:* ${owner}
*ℹ️Additional Info:* ${additionalInfo}`;

    const updatedMessageOptions = {
      contentText: updatedTer,
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
