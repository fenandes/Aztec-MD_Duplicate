const { proto, getContentType, jidDecode, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const vorterx = require('./vorterx.js');

const decodeJid = (jid) => {
  const { user, server } = jidDecode(jid) || {};
  return (user && server) ? `${user}@${server}`.trim() : jid;
};

const downloadMedia = async (message) => {
  let type = Object.keys(message)[0];
  let msg = message[type];

  if (type === 'buttonsMessage' || type === 'viewOnceMessageV2') {
    if (type === 'viewOnceMessageV2') {
      msg = message.viewOnceMessageV2 && message.viewOnceMessageV2.message;
      type = Object.keys(msg || {})[0];
    } else {
      type = Object.keys(msg || {})[1];
    }
    msg = msg && msg[type];
  }

  const stream = await downloadContentFromMessage(msg, type.replace('Message', ''));
  let buffer = Buffer.from([]);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  return buffer;
};

function serialize(msg, dsan) {
  if (msg.key) {
    msg.id = msg.key && msg.key.id;
    msg.isSelf = msg.key && msg.key.fromMe;
    msg.from = decodeJid(msg.key && msg.key.remoteJid);
    msg.isGroup = msg.from.endsWith('@g.us');
    msg.sender = msg.isGroup ? decodeJid(msg.key && msg.key.participant) : msg.isSelf ? decodeJid(vorterx.user.id) : msg.from;
  }

  if (msg.message) {
    msg.type = getContentType(msg.message);

    if (msg.type === proto.WebMessageInfo.MessageType.LOCATION) {
      msg.lat = msg.message.ephemeralMessage && msg.message.ephemeralMessage.message.locationMessage && msg.message.ephemeralMessage.message.locationMessage.degreesLatitude;
      msg.lng = msg.message.ephemeralMessage && msg.message.ephemeralMessage.message.locationMessage && msg.message.ephemeralMessage.message.locationMessage.degreesLongitude;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.REVOKED) {
      msg.text = '[message revoked]';
    }

    if (msg.type === proto.WebMessageInfo.MessageType.TEXT) {
      msg.text = msg.message.conversation && msg.message.conversation.startsWith('**') ? msg.message.conversation.substr(2).slice(0, -2) : msg.message.conversation;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.STICKER) {
      msg.image = true;
      msg.caption = msg.message.stickerMessage && msg.message.stickerMessage.caption;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.IMAGE) {
      msg.image = true;
      msg.caption = msg.message.imageMessage && msg.message.imageMessage.caption;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.VIDEO) {
      msg.video = true;
      msg.caption = msg.message.videoMessage && msg.message.videoMessage.caption;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.AUDIO) {
      msg.audio = true;
      msg.duration = msg.message.audioMessage && msg.message.audioMessage.seconds;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.DOCUMENT) {
      msg.document = true;
      msg.fileName = msg.message.documentMessage && msg.message.documentMessage.fileName;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.CONTACT) {
      msg.contact = true;
      msg.displayName = msg.message.contactMessage && msg.message.contactMessage.displayName;
      msg.vcard = msg.message.contactMessage && msg.message.contactMessage.vcard;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.LIVE_LOCATION) {
      msg.location = true;
      msg.lat = msg.message.locationMessage && msg.message.locationMessage.degreesLatitude;
      msg.lng = msg.message.locationMessage && msg.message.locationMessage.degreesLongitude;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.EXTENDED_TEXT) {
      msg.text = msg.message.extendedTextMessage && msg.message.extendedTextMessage.text;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.VOICE_NOTE) {
      msg.voiceNote = true;
      msg.duration = msg.message.audioMessage && msg.message.audioMessage.seconds;
    }

    msg.reply = (text) => vorterx.sendMessage(msg.from, { text }, { quoted: msg });
    msg.download = () => downloadMedia(msg.message);
  }

  return msg;
}

module.exports = {
  serialize,
  decodeJid
};
