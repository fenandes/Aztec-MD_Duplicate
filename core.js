const express = require('express');
const {
  default: WAConnection,
  DisconnectReason,
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  useMultiFileAuthState,
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const QuickDB = require('quick.db');
const moment = require('moment-timezone');
const fs = require('fs');
const { Collection } = require('discord.js');
const contact = require('./mangoes/contact.js');
const config = require('./config.js');
const botName = config.botName;
const { imageSync } = require('qr-image');
const MessageHandler = require('./lib/message/vorterx');
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const PORT = process.env.PORT || 3000;

async function startAztec() {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds, clearState } = await useMultiFileAuthState('session_Id');

  const vorterx = WAConnection({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    browserDescription: Browsers.macOS("Desktop"),
    qrTimeoutMs: undefined,
    auth: state,
    version
  });

  store.bind(vorterx.ev);
  vorterx.cmd = new Collection();
  vorterx.contact = contact;

  await readCommands(vorterx);

  vorterx.ev.addListener('auth-state-update', saveCreds);
  vorterx.ev.addListener('connection-update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.qr) {
      vorterx.QR = imageSync(update.qr);
      fs.writeFileSync('qr_code.png', vorterx.QR);
    }
    if (
      connection === DisconnectReason.close ||
      connection === DisconnectReason.lost ||
      connection === DisconnectReason.restart ||
      connection === DisconnectReason.timeout
    ) {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

      console.log(`Connection ${connection}, reconnecting...`);

      if (reason === DisconnectReason.loggedOut) {
        console.log('Device Logged Out, Please Delete Session and Scan Again.');
        process.exit();
      }

      await startAztec();
    } else if (connection === DisconnectReason.close) {
      console.log(`[ 🐲AZTEC ] Connection closed, reconnecting...`);
      await startAztec();
    } else if (connection === DisconnectReason.lost) {
      console.log(`[ 🦅AZTEC ] Connection Lost from Server, reconnecting...`);
      await startAztec();
    } else if (connection === DisconnectReason.restart) {
      console.log(`[ 🦅AZTEC ] Server has just started...`);
      await startAztec();
    } else if (connection === DisconnectReason.timeout) {
      console.log(`[ 🐲 AZTEC ] Connection Timed Out, Trying to Reconnect...`);
      await startAztec();
    } else {
      console.log(`[ 🦅 AZTEC ] Server Disconnected: Maybe Your WhatsApp Account has got banned`);
    }
  });

  vorterx.ev.addListener('message-new', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.addListener('contacts-received', async ({ updatedContacts }) =>
    await contact.saveContacts(updatedContacts, vorterx)
  );

  vorterx.ev.addListener('connection-created', async () => {
    if (!vorterx.QR) {
      console.log('QR code not available');
    } else {
      fs.writeFileSync('qr_code.png', vorterx.QR);
      console.log('QR code saved as qr_code.png');
    }
  });

  const app = express();
  app.get('/', async (req, res) => {
    if (!vorterx.QR) {
      res.status(404).send('QR code not available');
    } else {
      res.status(200).send('QR code saved as qr_code.png');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}/`);
  });
}

async function readCommands(vorterx) {
  const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    constcommand = require(`./commands/${file}`);
    vorterx.cmd.set(command.name, command);
  }
}

startAztec();
