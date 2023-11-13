//===============>

// CREATED BY DIEGOSON FENANDEZ

//===============>

const { getFileSizeInMB, getCpuSpeed, getUploadSpeed } = require("../lib/_speedSystem.js");
const os = require("os");
const speed = require("performance-now");
const { exec } = require("child_process");

module.exports = {
   name: 'ping',
   category: 'Mics',
   description: 'Check the speedy',
   async xstart(vorterx, m, { xReact,text }) {
      await xReact("🏇");

      const fileSizeInMB = getFileSizeInMB("../lib/_speedSystem");
      const cpuSpeedResult = { speed: getCpuSpeed() }; 
      const uploadSpeedInMbps = getUploadSpeed(); 

      const startTimestamp = speed();
      exec(`neofetch --stdout`, (error, stdout, stderr) => {
         const endTimestamp = speed();
         const latency = endTimestamp - startTimestamp;

         const child = stdout.toString("utf-8");
         const aztec = child.replace(/Memory:/, "Ram:");

         m.reply(`${aztec}*🛑 Performance:* ${latency.toFixed(4)} ms
         *📥 File Size:* ${fileSizeInMB} MB
         *💻 CPU Speed:* ${cpuSpeedResult.speed} GHz
         *📤 Upload Speed:* ${uploadSpeedInMbps} Mbps`);
      });
     }
   };
