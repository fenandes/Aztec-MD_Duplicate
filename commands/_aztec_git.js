const axios = require("axios");
const moment = require("moment-timezone");
const fs = require("fs");
const { aztec_images } = require("../mangoes/encryptFunc.js");

module.exports = {
  name: "sc",
  alias: ["script"],
  description: "Retrieve Aztec information",
  category: "General",
  async xstart(vorterx, m, { xReact, text, args }) {
    const aztecImage = {
      url: "https://i.ibb.co/Bc7f99L/T0s-Ay-RIh-T6-Ni4v-Uw.jpg",
      mimetype: "aztecImage/jpg",
      };
    
    await xReact("🙋‍♂️");
    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
      .split(",");
    const { data: repoData } = await axios.get(
      "https://api.github.com/repos/Vorterx/Aztec-MD"
    );
    const { data: commitData } = await axios.get(
      "https://api.github.com/repos/Vorterx/Aztec-MD/commits"
    );

    const gitMessage = `
      ╭──────────────────────╮
      │ *乂 AZTEC M D- REPO 乂*│
      ├──────────────────────┤
      │ 🌟 Total Stars: ${repoData.stargazers_count}\n
      │ 🛸 Users: ${repoData.forks_count}\n
      │ 🌲 Last Updated: ${repoData.updated_at}\n
      │ 🌲 Repo URL: ${repoData.html_url}\n
      │ 📧 Email: amdablack63@gmail.com\n
      │ 🆕 Latest Commit: ${commitData[0].commit.message}\n
      │ 📅 Commit Date: ${commitData[0].commit.author.date}\n
      │ ⌚ Time: ${time}\n
      │ 👤 Author: Diegoson\n
      │ *© aztec wabot*
      ╰──────────────────────╯
    `;

    const aztecMessage = {
      image: { url: await aztec_images() },
      caption: gitMessage,
      footer: "aztec",
      headerType: 1,
      contextInfo: {
        externalAdReply: {
          title: "Powered by Aztec",
          body: "Unleash your imagination",
          mediaType: 1,
          thumbnail: aztecImage,
          mediaUrl: "",
          sourceUrl: "",
        },
      },
    };

    await vorterx.sendMessage(m.from, aztecMessage, { quoted: m });
  },
};
