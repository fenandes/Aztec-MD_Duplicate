const { default: VorterxConnection, DisconnectReason, Browsers, delay, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState } = require('@adiwajishing/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const { Collection } = require('discord.js');
const config = require('./config.js');
const botName = config.botName;
const { AztecSession } = require("./lib/session.js");
const qr = require("qr-image");
const contact = require('./mangoes/contact.js');
const MessageHandler = require('./lib/message/vorterx');

async function startAztec() {
  const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
  const { state, saveCreds, clearState } = await useMultiFileAuthState(__dirname + "./lib/session");
  if (!fs.existsSync("./lib/session/creds.json")) {
  AztecSession(config.session_Id, "./lib/session/creds.json");
            

  const vorterx = VorterxConnection({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Desktop"),
    qrTimeoutMs: undefined,
    auth: state,
    version: (await fetchLatestBaileysVersion()).version,
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
      console.log('👩‍💻Plugins has been loaded successfully'); 
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
      const aztec_text = `\`\`\`Vorterx connected \nversion : ${require(__dirname + "/package.json").version}\nBotName: ${botName}\`\`\``;
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
}
  vorterx.ev.on('groups.update', async (data) => {try {
    const imageGc = await vorterx.profilePictureUrl(anu.id, 'image');
    } catch (err) {console.log(err);
    imageGc = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60';}
    const res = data[0];
    if (res.announce == true) { await sleep(2000);
    vorterx.sendMessage(res.id, {text: `*【 GROUP MUTTED SS 】*\n\n\`\`\`THE GROUP HAS BEEN LOCKED\`\`\``});
    } else if (res.announce == false) {await sleep(2000);
    vorterx.sendMessage(res.id, {text: `*【 GROUP UNMUTED SS 】*\n\n\`\`\`THE GROUP HAS BEEN UNLOCKED\`\`\``});
    } else if (res.restrict == true) {await sleep(2000);
    vorterx.sendMessage(res.id, {text: `*【 GROUP INFO SS 】*\n\n\`\`\`GROUP INFO HAS BE OONED BY ADMIN\`\`\``});
    } else if (res.desc !== '') {await sleep(2000);
    vorterx.sendMessage(res.id, {text: `*【 GROUP DESC SS 】*\n\n\`\`\`GROUP DESC HAS BEEN CHANGED =>\`\`\`\n\n*${res.desc}*`
    })}});
   //_____[TIME : DATE ]__
   let [date, time] = new Date()
  .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
  .split(",");
  //______[■■■■■]__
vorterx.ev.on('group-participants.update', async (anu) => {
  try {
    let metadata = await vorterx.groupMetadata(anu.id);
    let participants = anu.participants;
    for (let num of participants) {
      try {
        imageUser = await vorterx.profilePictureUrl(num, 'image');
      } catch (err) {
        imageUser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
      }
      try {
        imageUser = await vorterx.profilePictureUrl(anu.id, 'image');
      } catch (err) {
        imageGc = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60';
      }
      vorterx_member = metadata.participants.length;
      aztecW = await getBuffer(imageUser);
      aztecL = await getBuffer(imageUser);
      
      if (anu.action == 'add') {
        const vorterx_buffer = await getBuffer(imageUser);
        let vorterxName = num;
        const vorterx_members = metadata.participants.length;
        vorterx_aztec = `╭─💙 *Welcome @${vorterxName.split("@")[0]}
├  
├ *Group Name*: ${metadata.subject}
├ *Group Member*: ${vorterx_member}
├ *Due Date*: ${date}
├
│🤩Plz Behave
╰──────────⭑`;
        vorterx.sendMessage(anu.id, {
          text: vorterx_aztec,
          contextInfo: {
            mentionedJid: [num],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "title": `${botName}`,
              "body": "Powerd by Aztec",
              "previewType": "PHOTO",
              "thumbnail": aztecW,
              "sourceUrl": ``,
            }
          }
        });
      } else if (anu.action == 'remove') {
        var vorterx_buffer = await getBuffer(imageUser);
        var vorterxName = num;
        const vorterx_members = metadata.participants.length;
        vorterx_aztec = `╭─🙌 *Very Well @${vorterxName.split("@")[0]}
├ 
├ *Group Name*: ${metadata.subject}
├ *Due Date*: ${date}
├
│👋Uhambe Kahle
╰──────────⭑`;
        vorterx.sendMessage(anu.id, {
          text: vorterx_aztec,
          contextInfo: {
            mentionedJid: [num],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "title": `${botName}`,
              "body": "Powerd by Aztec",
              "previewType": "PHOTO",
              "thumbnail": aztecL,
              "sourceUrl": ``,
            }
          }
        });
      } else if (anu.action == 'promote') {
        const vorterx_buffer = await getBuffer(imageUser);
        let vorterxName = num;
        vorterx_aztec = `╭─🤩*PROMOTED-RECEIVED*
├ 
├ *userName*: ${vorterxName.split("@")[0]}
├ *Due Date*: ${time}
╰──────────⭑`;
        vorterx.sendMessage(anu.id, {
          text: vorterx_aztec,
          contextInfo: {
            mentionedJid: [num],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "title": "Powerd by Aztec",
              "body": `${botName}`,
              "previewType": "PHOTO",
              "thumbnail": aztecW,
              "sourceUrl": ``,
            }
          }
        });
      }
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startAztec();
