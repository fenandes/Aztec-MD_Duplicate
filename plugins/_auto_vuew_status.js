const config = require('../config.js');

vorterx.ev.on('messages.upsert', async chatUpdate => {
            const botNumber = await vorterx.decodeJid(vorterx.user.id);
            const mek = chatUpdate.messages[0]
                 if (!mek.message) return
                 mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.m.ephemeralcitel.message : mek.message
                 if(mek.key && mek.key.remoteJid === 'status@broadcast'){
                    last_status = mek;
                    if( config.read_status === 'true'){ await vorterx.readMessages([mek.key]);}
                     
                    return;
                    }
