const express = require('express');
const {
  default: WAConnection,
  DisconnectReason,
  Browsers,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  delay,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const { QuickDB } = require('quick.db');
const moment = require('moment-timezone');
const fs = require('fs');
const config = require('./config');
const { Collection } = require('discord.js');
const contact = require('./mangoes/contact.js');
const MessageHandler = require('./lib/message/vorterx');

const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
const PORT = process.env.PORT || 3000;

async function startAztec() {
  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = useMultiFileAuthState('./connects/creds.json');

  const vorterx = WAConnection();
  vorterx.logger = P({ level: 'silent' });
  vorterx.printQRInTerminal = false;
  vorterx.browser = Browsers.firefox('Desktop').userAgent;
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
  vorterx.ev.on('groups.update', async (json) => {
    try {
    const imageGc = await vorterx.profilePictureUrl(anu.id, 'image');
    } catch (err) {
     console.log(err);
     imageGc = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60';
    }
    console.log(json);
    const res = json[0];
    if (res.announce == true) {
    await sleep(2000);
    vorterx.sendMessage(res.id, {
     text: `「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admins can send messages !`
     });
    } else if (res.announce == false) {
    await sleep(2000);
    vorterx.sendMessage(res.id, {
    text: `「 Group Settings Change 」\n\nThe group has been opened by admin, Now participants can send messages !`
      });
    } else if (res.restrict == true) {
     await sleep(2000);
     vorterx.sendMessage(res.id, {
     text: `「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !`
      });
    } else if (res.restrict == false) {
     await sleep(2000);
     vorterx.sendMessage(res.id, {
     text: `「 Group Settings Change 」\n\nGroup info has been opened, Now participants can edit group info !`
      });
    } else if (res.desc !== '') {
     await sleep(2000);
     vorterx.sendMessage(res.id, {
     text: `「 Group Settings Change 」\n\n*Group description has been changed to*\n\n${res.desc}`
      });
    } else {
    await sleep(2000);
    vorterx.sendMessage(res.id, {
    text: `「 Group Settings Change 」\n\n*Group name has been changed to*\n\n*${res.subject}*`
   });
    }
   });

  const app = express();
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
