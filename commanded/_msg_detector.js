module.exports = {
  description: 'To detect deleted msg send by user',

  async start(vorterx, m, { text,xReact }) {
    if (m.type === 'delete') {
      await xReact('🚮');
      const deletedMessage = await vorterx.getMessageById(m.quotedMsgObj.id._serialized);

      if (deletedMessage.fromMe) {
        const deletedMessageText = deletedMessage.body;
        const deletedMessageTimestamp = deletedMessage.timestamp;
        const deletedByUser = m.author;

        const deletedDate = new Date(deletedMessageTimestamp * 1000).toLocaleString();
        const ca_pction = `A message was deleted:\n\n"${deletedMessageText}"\n\nSent at: ${deletedDate}\nDeleted by: ${deletedByUser}`;
        vorterx.sendMessage(m.from, ca_pction);
      }
    }
  }
};
