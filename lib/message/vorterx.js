require('../../config.js');
require('./_vorterxIDS.js');
const config  = require('../../config.js');
const { serialize,decodeJid } = require('./D3centX.js');
//const { decodeJid } = require('./_utils.js');
const Diego_thumb = config.thumb;
const chalk = require('chalk');
const PREFIX = process.env.PREFIX;

//======================================================

module.exports = MessageHandler = async (messages, vorterx) => {
  try {
    if (messages.type !== 'notify') return;
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx);
    if (!m.message) return;
    if (m.key && m.key.remoteJid === 'status@broadcast') return;
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '') return;

    const antilink = process.env.ANTILINK || true;
    const { isGroup, type, sender, from, body } = m;
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : '';
    const gcName = isGroup ? gcMeta.subject : '';
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const isCmd = body.startsWith(PREFIX);
    const cmdName = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const arg = body.replace(cmdName, '').slice(1).trim();
    const groupMembers = gcMeta?.participants || [];
    const botNumber = await decodeJid(vorterx.user.id);
    let participants = isGroup ? gcMeta.participants : [sender];
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
    let isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
    let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    let mime = (quoted.msg || m.msg).mimetype || " ";
    let quoted = m.quoted ? m.quoted : m;
    const ActivateMod = (await vorterx.DB.get('mod')) || [];
    const banned = (await vorterx.DB.get('banned')) || [];

    if(antilink == true) {
      if (
      isGroup &&   groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') &&
      body
      ){
        const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/)
        if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
        const groupCode = groupCodeRegex[1]
        const groupNow = await vorterx.groupInviteCode(from)

            //=============

          const mentionByTag =type == "extendedTextMessage" &&m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid: [];

          if (groupCode !== groupNow) {
          await vorterx.sendMessage(from, { delete: m.key })
          { await vorterx.groupParticipantsUpdate(from, [sender], 'remove')
          m.reply('⭐*Trash has been removed successfully*')}
        }
        }
        }
        }
      if (banned.includes(sender)) return m.reply('*You are banned from using the bot*')
        
      //=========================================
              //[ sendText function by Diego ]

       async function sendText(vorterx, m, text) {
       try {
       await vorterx.sendMessage(m.from, { text });
       console.log('👍Message has been sent successfully');
       } catch (error) {
       console.error('➖Failed to send message:', error);
       }
       }
       const message = 'Diegoson, Fernandez';
       sendText(vorterx, m, message);
    
             // [ waitForMessage Function by Diego ] 
        
      async function waitForMessage(vorterx, m) {
      return new Promise((resolve, reject) => {
      const listener = vorterx.onMessage((message) => {
      if (message.chat.id === m.chat.id && message.from === m.from) {
      resolve(message);
      vorterx.removeMessageListener(listener);
      }
      });
      setTimeout(() => {
      reject(new Error('Timeout: No message received within the specified time'));
      vorterx.removeMessageListener(listener);
      }, 60000);
      });
      }

      try {
      const response = await waitForMessage(vorterx, m);
      console.log('Received message:', response);
      } catch (error) {
      console.error('Error:', error);
      }
      //================================== 
      //____________[AUTO BIO OPTIONS]_
      function fetchBotConfiguration() {
      const botIDs = Object.keys(vorterx);
      const aztecBotID = botIDs[Math.floor(Math.random() * botIDs.length)];
      const vorterxBotConfiguration = vorterx[aztecBotID];

      return vorterxBotConfiguration;
      }
      const vorterxBotConfiguration = fetchBotConfiguration();

      const botName = vorterxBotConfiguration.botName;
      const author =  vorterxBotConfiguration.author;
     //==================================
         //________AUTO BIO___
      const pad = (s) => (s < 10 ? "0" : "") + s;
      const formatTime = (seconds) => {
      const hours = Math.floor(seconds / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      const secs = Math.floor(seconds % 60);
      return (time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`);
     };
     const uptime = () => formatTime(process.uptime());
     let aztecText = `【 ${botName} 🕹By Vorterx: ${author} Dev 】🌡Runtime: ${uptime()}`;     
     await vorterx.updateProfileStatus(aztecText);

  
      if(body == prefix) {
      await xReact("💢");
      vorterx.sendMessage(m.from,{text:`*🙋‍♂️Can l help you master* use[${prefix}menu] *toget my cmds*`},{quoted:m});
       }
      //======================================================
      if (m.message && isGroup) {
      console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
      chalk.black(
      chalk.bgRed(isGroup ? gcMeta.subject : m.pushName)
       ) +
       "\n" +
       chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
       chalk.black(chalk.bgRed(m.pushName)) +
       "\n" +
       chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
       chalk.black(chalk.bgRed(body || type)) + "\n" + ""
       );
       }
      if (m.message && !isGroup) {
      console.log(
      "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
      chalk.black(chalk.bgMagentaBright("+" + m.from.split("@")[0])) +
      "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]       => ")),
      chalk.black(chalk.bgMagentaBright(m.pushName)) +
      "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
      chalk.black(chalk.bgMagentaBright(body || type)) + "\n" + ""
      );
      }
      let autoReactActive = false;
      async function activateAutoReact() {
      autoReactActive = true;
      console.log("☣️Auto-react has been activated.");
      }
      async function deactivateAutoReact() {
      autoReactActive = false;
      console.log("📴Auto-react has been deactivated.");
      }

     activateAutoReact();
     console.log(autoReactActive);

     deactivateAutoReact();
     console.log(autoReactActive); 
    //=============>
    //      
    //XREACT A FUNCTION TO REACT TO ALL CMDS
    //
    //=============>
    async function xReact(emoji) {
      const reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
        };
       await vorterx.sendMessage(m.from, reactm);
        };
     async function doReply(text) {
     const reply = {contextInfo: {
      externalAdReply: {title: 'NEED QUERY',
      body: 'Type Something please',
      thumbnail: 'Diego_thumb',mediaType: 1,mediaUrl: '',
      sourceUrl: 'https://vorterx.com',
      showAdAttribution: true}}
     };
     vorterx.sendMessage(m.from, reply);
     };
     if (!isCmd) return
      const command =
      vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    
      command.xstart(vorterx,
                     m,{
                     name: "vorterx",
                     pushName: m.pushName,
                     arg,
                     deactivateAutoReact,
                     activateAutoReact,
                     doReply,
                     text,
                     waitForMessage,  
                     sendText,
                     participants,
                     mentionByTag,
                     mime,
                     isAdmin,
                     isBotAdmin,
                     xReact
    }) } catch (err) {
        err = String(err);
     if (!err.includes("command.xstart")) console.error(err, 'red');
  }
                                         }
