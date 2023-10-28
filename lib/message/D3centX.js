const { proto, getContentType, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { decodeJid } = require('./_utils.js');

const downloadMedia = async (message) => {
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
  const serialize = async (msg, vorterx) => {
  if (msg.key) {
    msg.id = msg.key && msg.key.id;
    msg.isSelf = msg.key && msg.key.fromMe;
    msg.from = decodeJid(msg.key && msg.key.remoteJid);
    msg.isGroup = msg.from.endsWith('@g.us');
    msg.sender = msg.isGroup ? decodeJid(msg.key && msg.key.participant) : msg.isSelf ? decodeJid(vorterx.user.id) : msg.from;
  }

  if (msg.message) {
    console.log('Message:', msg.message); 
    
    msg.type = getContentType(msg.message);

    console.log('Message Type:', msg.type); 
    if (msg.type === proto.WebMessageInfo.MessageType.REVOKED) {
      msg.text = '[message revoked]';
    }
    if (msg.type === proto.WebMessageInfo.MessageType.TEXT) {
      msg.text = msg.message?.conversation && msg.message?.conversation.startsWith('**') ? msg.message?.conversation.substr(2).slice(0, -2) : msg.message?.conversation;
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
      msg.audio = true;
      msg.duration = msg.message.audioMessage && msg.message.audioMessage.seconds;
    }
    if (msg.type === proto.WebMessageInfo.MessageType.POLL) {
      msg.poll = true;
      msg.question = msg.message.pollMessage && msg.message.pollMessage.pollQuestionData && msg.message.pollMessage.pollQuestionData.question;
      msg.options = msg.message.pollMessage && msg.message.pollMessage.pollQuestionData && msg.message.pollMessage.pollQuestionData.options.map(option => option.text);
    }

    if (msg.type === proto.WebMessageInfo.MessageType.ORDERED_LIST) {
      msg.list = true;
      msg.items = msg.message.orderedListItem && msg.message.orderedListItem.map(item => item.text);
    }

    if (msg.type === proto.WebMessageInfo.MessageType.VCARD) {
      msg.contact = true;
      msg.vcard = msg.message.contactMessage && msg.message.contactMessage.vcardList && msg.message.contactMessage.vcardList[0];
    }

    if (msg.type === proto.WebMessageInfo.MessageType.FOUR_ROW_TEMPLATE) {
      msg.template = true;
      msg.templateType = 'fourRow';
      msg.title = msg.message.listMessage && msg.message.listMessage.title;
      msg.description = msg.message.listMessage && msg.message.listMessage.description;
      msg.buttons = msg.message.listMessage && msg.message.listMessage.buttons && msg.message.listMessage.buttons.map(button => button.buttonText);
    }

    if (msg.type === proto.WebMessageInfo.MessageType.OPEN_GRAPH) {
      msg.linkPreview = true;
      msg.title = msg.message.webPageMessage && msg.message.webPageMessage.title;
      msg.description = msg.message.webPageMessage && msg.message.webPageMessage.description;
      msg.url = msg.message.webPageMessage && msg.message.webPageMessage.url;
      msg.thumbnail = msg.message.webPageMessage && msg.message.webPageMessage.pageThumbnail && msg.message.webPageMessage.pageThumbnail.url;
    }

    if (msg.type === proto.WebMessageInfo.MessageType.FIVE_ROW_TEMPLATE) {
      msg.template = true;
      msg.templateType = 'fiveRow';
      msg.title = msg.message.listMessage && msg.message.listMessage.title;
      msg.description = msg.message.listMessage && msg.message.listMessage.description;
      msg.buttons = msg.message.listMessage && msg.message.listMessage.buttons && msg.message.listMessage.buttons.map(button => button.buttonText);
    }

    if (msg.type === proto.WebMessageInfo.MessageType.SECTION_TEMPLATE) {
      msg.template = true;
      msg.templateType = 'section';
      msg.title = msg.message.listMessage && msg.message.listMessage.title;
      msg.description = msg.message.listMessage && msg.message.listMessage.description;
      msg.buttons = msg.message.listMessage && msg.message.listMessage.buttons && msg.message.listMessage.buttons.map(button => button.buttonText);
    }

    if (msg.type === proto.WebMessageInfo.MessageType.BUTTON_RESPONSE_MESSAGE) {
      msg.buttonsResponse = true;
      msg.selectedButtonIndex = msg.message.buttonsResponseMessage && msg.message.buttonsResponseMessage.selectedButtonIndex;
      msg.selectedDisplayText = msg.message.buttonsResponseMessage && msg.message.buttonsResponseMessage.selectedDisplayText;
    }
   if (msg.isMedia || msg.isMMS) {
      msg.mediaData = await downloadMedia(msg.message);
      msg.mediaKey = await vorterx.mediaKey(msg.message);
    }
  }

  return msg;
}
module.exports = {
serialize
};
