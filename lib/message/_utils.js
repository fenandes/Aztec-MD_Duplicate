const { jidDecode } = require('@whiskeysockets/baileys');

const decodeJid = (jid) => {
const { user, server } = jidDecode(jid) || {};
return (user && server) ? `${user}@${server}`.trim() : jid;
};

module.exports = {
decodeJid
};
