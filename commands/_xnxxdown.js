//=======
//==DN DOWNLOAD 

//=======AZTEC-MD

module.exports = {
  name: "xnxxdn",
  description: "To download xnxx videos",
  category: "Download",
  async xstart(vorterx, m, { xReact, text, doReply, args }) {
    const axios = require("axios");

    if (!text) {
      await xReact("⛔");
      m.reply("*Missing XNXX link, please provide one.*");
      return;
    }

    let urlYt = text;
    if (!urlYt.startsWith("https")) {
      await xReact("⛔");
     doReply("*😏 Provide me with an XNXXVD link.*");
    }

    await xReact("🍑");

    const res = await axios(`https://raganork-network.vercel.app/api/xvideos/download?url=${text}`);
    const video = res.data;

    let D3centX = `╭─🎬*XNXX VIDEO DOWNLOAD*
│
├ 🍑TITLE: XNXX
├ 
├ 📟BOTNAME: ${process.env.BOTNAME}
├ 
├ 📤DOWNLOAD LINK: [${video}]
│
╰──────────⭑ `;

    let buttonMessage = {
      video: video,
      mimetype: "video/mp4",
      fileName: `vorterx.mp4`,
      caption: D3centX,
      gifPlayback: false,
      height: 496,
      width: 640,
      headerType: 4,
      headerType: 4,
        messageOptions: {
        textColor: "#ffffff", 
        backgroundColor: "#333333", 
        footerBackgroundColor: "#222222",  
        },
     };

    return await vorterx.sendMessage(m.from, buttonMessage, { quoted: m });
   },
  };
