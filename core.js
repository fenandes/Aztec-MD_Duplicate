const express = require('express');
const {default: WAConnection,DisconnectReason,Browsers,fetchLatestBaileysVersion,makeInMemoryStore,delay,useMultiFileAuthState} = require('@adiwajshing/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const { QuickDB } = require('quick.db');
const moment = require('moment-timezone');
const fs = require('fs');
const qrcode = require('qrcode');
const config = require('./config');
const sessionId = config.sessionId;
const { Collection } = require('discord.js');
const Auth = require('./mangoes/mongo_connect/mongouse.js');
const contact = require('./mangoes/contact.js');
const botName = config.botName;
const MessageHandler = require('./lib/message/vorterx');

const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
const PORT = process.env.PORT || 3000;

let qr_gen = "invalid";
async function startAztec() {
  const { getAuthFromDatabase } = new Auth(sessionId);
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveState, clearState } = await getAuthFromDatabase();

  const vorterx = WAConnection();
  vorterx.logger = P({ level: 'silent' });
  vorterx.printQRInTerminal = false;
  vorterx.browser = Browsers.macOS("Desktop");
  vorterx.qrTimeout = undefined;
  vorterx.auth = state;
  vorterx.version = version;

  store.bind(vorterx.ev);
  vorterx.cmd = new Collection();
  vorterx.DB = new QuickDB();
  vorterx.contactDB = vorterx.DB.table('contacts');
  vorterx.contact = contact;

  await readCommands(vorterx);

  vorterx.ev.on('creds.update', saveCreds);
  vorterx.ev.on('connection.update', async (update) => {
  const { connection, lastDisconnect } = update;

    if (
      connection === 'close' ||
      connection === 'lost' ||
      connection === 'restart' ||
      connection === 'timeout'
     ) {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

      console.log(`Connection ${connection}, reconnecting...`);

      if (reason === DisconnectReason.loggedOut) {
      console.log('Device Logged Out, Please Delete Session and Scan Again.');
      process.exit();
      }

      await startAztec();
    } else if (connection === 'close') {
      console.log(`[ 🐲AZTEC ] Connection closed, reconnecting...`);
      await startAztec();
    } else if (connection === 'lost') {
      console.log(`[ 🦅AZTEC ] Connection Lost from Server, reconnecting...`);
      await startAztec();
    } else if (connection === 'restart') {
      console.log(`[ 🦅AZTEC ] Server has just started...`);
      await startAztec();
    } else if (connection === 'timeout') {
      console.log(`[ 🐲 AZTEC ] Connection Timed Out, Trying to Reconnect...`);
      await startAztec();
    } else {
      console.log(`[ 🦅 AZTEC ] Server Disconnected: Maybe Your WhatsApp Account has got banned`);
    }
  });

  vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));
  
  const app = express();
  app.get("/qr", async (req, res) => {
  res.setHeader("content-type", "image/png");
  res.send(await qrcode.toBuffer(qr_gen));
  });

  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}/`);
  });

  await vorterx.connect();
 }

async function readCommands(vorterx) {
    const commandFiles = fs.readdirSync('./Commands').filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    vorterx.cmd.set(command.name, command);
   }
   }

startAztec();
