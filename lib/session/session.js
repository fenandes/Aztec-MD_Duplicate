const fs = require('fs');
const { writeFile } = require('fs/promises');
const axios = require('axios');

module.exports = {
    async MakeSession(session_Id, authFile) {
        return new Promise(async (resolve, reject) => {
        let cc = session_Id.replace(/Vorterx;;;/g, "");
         cc = Buffer.from(cc, "base64").toString("utf-8");
            
           try {
                const { data } = await axios.get('https://paste.c-net.org/' + cc);
                if (!fs.existsSync(authFile)) {
                 await writeFile(authFile, data);
                  resolve(true);
                }
            } catch (err) {
             reject(err);
             console.log(err);
            }}); },
       };
