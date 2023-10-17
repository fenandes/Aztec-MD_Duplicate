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
  //_____________[■■■■■]__
  vorterx.ev.on('group-participants.update', async (anu) => {
  console.log(anu)
  try {
  let metadata = await vorterx.groupMetadata(anu.id)
  let participants = anu.participants
  for (let num of participants) {
  try {
  imageUser = await vorterx.profilePictureUrl(num, 'image')
  } catch (err) {
  imageUser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
  }
  try {
  imageUser = await vorterx.profilePictureUrl(anu.id, 'image')
  } catch (err) {
  imageGc = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
  }
  memb = metadata.participants.length
  aztecW = await getBuffer(imageUser)
  aztecL = await getBuffer(imageUser)
  if (anu.action == 'add') {const vorterx_buffer = await getBuffer(imageUser)
  let vorterxName = num
  const vorterx_time = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	const vorterx_date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	const vorterx_members = metadata.participants.length
  vorterx_aztec = `╭─💙 *Welcome @${vorterxName.split("@")[0]}
├ *Group Name*: ${metadata.subject}
├ *Group Member*: ${vorterx_member}
├ *Due Date*: ${vorterx_date}
├
│🤩Plz Behave
╰──────────⭑`
 vorterx.sendMessage(anu.id,{ text: vorterx_aztec,contextInfo:{mentionedJid:[num],"externalAdReply": {"showAdAttribution": true,"containsAutoReply": true,"title": ` ${botName}`,"body": `Powerd by Aztec`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": aztecW,"sourceUrl": ``}}})
} else if (anu.action == 'remove') {
const vorterx_buffer = await getBuffer(imageUser)
const vorterx_date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let vorterxName = num
const vorterx_members = metadata.participants.length
vorterx_aztec = `╭─🙌 *Very Well @${vorterxName.split("@")[0]}
├ 
├ *Group Name*: ${metadata.subject}
├ *Due Date*: ${vorterx_date}
├
│👋Uhambe Kahle
╰──────────⭑`
vorterx.sendMessage(anu.id,{ text: vorterx_aztec,contextInfo:{mentionedJid:[num],"externalAdReply": {"showAdAttribution": true,"containsAutoReply": true,"title": ` ${botName}`,"body": `Powerd by Aztec`,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": aztecL,"sourceUrl": ``,}}})
} else if (anu.action == 'promote') {
const vorterx_buffer = await getBuffer(imageUser)
const vorterx_date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let vorterxName = num
vorterx_aztec = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${xeonName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
vorterx.sendMessage(anu.id, { text: vorterx_aztec,contextInfo:{mentionedJid:[num],"externalAdReply": {"showAdAttribution": true,"containsAutoReply": true,"title": `Powerd by Aztec`,"body": `${botName}`,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": aztecW,"sourceUrl": ``,}}})
} else if (anu.action == 'demote') {
const vorterx_buffer = await getBuffer(imageUser)
const vorterx_date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let vorterxName = num
vorterx_aztec = `𝗢𝗼𝗽𝘀‼️ @${xeonName.split("@")[0]}, you have been *demoted* from *admin* 😬`
vorterx.sendMessage(anu.id,{ text: vorterx_aztec,contextInfo:{mentionedJid:[num],"externalAdReply": {"showAdAttribution": true,"containsAutoReply": true,"title": ` ${botName}`,"body": `Powered by Aztec`,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": aztecL,"sourceUrl": ``,}}})
}
}
} catch (err) {
console.log(err)
}
})

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
