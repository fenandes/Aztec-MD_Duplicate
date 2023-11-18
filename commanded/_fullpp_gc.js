module.exports = {
  name: 'gcfullp',
  description: 'Set group full picture dp',
  category: 'Group',
  async xstart(vorterx,m,{isAdmin,isBotAdmin,xReact,text,args}) {
    
     if (!isAdmin) { await xReact("❌");
      return m.reply(`This command is only for group admins`);
        }
      if (!isBotAdmin) { await xReact("❌");
      return m.reply(`l must be an admin for me to help`);
        }

        if (!/image/.test(mime)) {
          await xReact("❌");
          return vorterx.sendMessage(m.from,{text: `Please reply to a Picture`,},{ quoted: m });
         }
        await xReact("📷");

        let quotedimage = await vorterx.downloadAndSaveMediaMessage(quoted);
        var { preview } = await generatePP(quotedimage);
        await vorterx.query({tag: "iq",attrs: {to: m.from,type: "set",xmlns: "w:profile:picture",},
        content: [{tag: "picture",attrs: { type: "image" },content: preview,},],});
        fs.unlinkSync(quotedimage);
        groupPp = await vorterx.profilePictureUrl(m.from, "image");

        vorterx.sendMessage(m.from,{image: { url: ppgc },caption: `Profile picture has been updated`},{ quoted: m });
