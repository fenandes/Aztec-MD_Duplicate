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

async function generateQRCode(connection) {
  return new Promise((resolve, reject) => {
    connection.ev.on('qr', (qr) => {
      const QR = imageSync(qr);
      fs.writeFileSync('qr_code.png', QR);
      resolve(QR);
    });
    connection.ev.on('connection-created', () => {
      reject(new Error('Failed to generate QR code'));
    });
  });
}

async function startAztec() {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds, clearState } = await useMultiFileAuthState('session_Id');

  const vorterx = new WAConnection({
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    browserDescription: Browsers.macOS("Desktop"),
    qrTimeoutMs: undefined,
    auth: state,
    version
  });

  const store = new QuickDB(); // Create a new instance of QuickDB
  store.bind(vorterx.ev);
  vorterx.cmd = new Collection();
  vorterx.contact = contact;

  await readCommands(vorterx);

  vorterx.ev.on('auth-state-update', saveCreds);
  vorterx.ev.on('connection-update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.qr) {
      vorterx.QR = await generateQRCode(vorterx);
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

  vorterx.ev.on('message-new', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.on('contacts-received', async ({ updatedContacts }) =>
    await contact.saveContacts(updatedContacts, vorterx)
  );

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get('/', async (req, res) => {
    if (!vorterx.QR) {
      res.status(404).send('QR code not available');
    } else {
      res.sendFile('qr_code.png', { root: __dirname });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function readCommands(vorterx) {
  const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    vorterx.cmd.set(command.name, command);
  }
}

startAztec();
