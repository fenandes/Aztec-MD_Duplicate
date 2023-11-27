const config = require('../config.js');

vorterx.ev.on('messages.upsert', async chatUpdate => {
            const botNumber = await vorterx.decodeJid(vorterx.user.id);
            const view = chatUpdate.messages[0]
                 if (!view.message) return
                 view.message = (Object.keys(view.message)[0] === 'ephemeralMessage') ? view.m.ephemeralMessage.message : view.message
                 if(mek.key && view.key.remoteJid === 'status@broadcast'){
                    last_status = view;
                    if( config.read_status === 'true'){ await vorterx.readMessages([view.key]);}
                     
                    return;
                    }
