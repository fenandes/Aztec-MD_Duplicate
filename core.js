const { default: VorterxConnection, DisconnectReason, Browsers, delay, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const { Collection } = require('discord.js');
const config = require('./config.js');
const botName = config.botName;
const addHandlers = config.prefix;
const qr = require("qr-image");
const contact = require('./mangoes/contact.js');
const MessageHandler = require('./lib/message/vorterx');

async function startAztec() {
  const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
  let { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds, clearState } = await useMultiFileAuthState('session_Id');

  const vorterx = VorterxConnection({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    browser: Browsers.macOS("Desktop"),
    qrTimeoutMs: undefined,
    auth: state,
    version
  });

  store.bind(vorterx.ev);
  vorterx.cmd = new Collection();
  vorterx.contactDB = new QuickDB().table('contacts');
  vorterx.contact = contact;

  async function readcommands() {
    const cmdfile = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
    for (const file of cmdfile) {
    const command = require(`./commands/${file}`);
    vorterx.cmd.set(command.name, command);
    }
  }

  readcommands();

  vorterx.ev.on('creds.update', saveCreds);
  vorterx.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionClosed) {
      console.log("[🐲AZTEC] Connection closed, reconnecting.");
      startAztec();
      } else if (reason === DisconnectReason.connectionLost) {
      console.log("[🐏AZTEC] Connection Lost from Server, reconnecting.");
      startAztec();
      } else if (reason === DisconnectReason.loggedOut) {
      console.log("[😭AZTEC] Device Logged Out, Please Delete Session and Scan Again.");
      process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
      console.log("[♻️AZTEC] Server starting.");
      startAztec();
      } else if (reason === DisconnectReason.timedOut) {
      console.log("[🎰AZTEC] Connection Timed Out, Trying to Reconnect.");
      startAztec();
      } else {
      console.log("[🌬AZTEC] Server Disconnected: Maybe Your WhatsApp Account got banned");
     }
    }

    if (connection === "open") {
    const aztec_text = `\`\`\`Vorterx connected \n\nVERSION : ${require(__dirname + "/package.json").version}\nBOTNAME: ${botName}\nPREFIX: ${addHandlers}\`\`\``;
    vorterx.sendMessage(vorterx.user.id, { text: aztec_text });
    }
    if (update.qr) {
    vorterx.QR = qr.imageSync(update.qr);
    }
   });

  app.get("/", (req, res) => {
  res.end(vorterx.QR);
  });

  vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));
}

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

startAztec();
