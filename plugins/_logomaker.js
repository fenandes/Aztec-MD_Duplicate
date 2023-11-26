const axios = require("axios");
const maker = require("mumaker");

module.exports = {
  name: "logomaker",
  description: "Logo maker",
  category: "logomaker",
  async xstart(vorterx, m, { text, xReact, args }) {
    const command = args[0];

    if (command === "help") {
      const commandsList = [
┌─『 *LOGO MAKERS* 』─❖

 | -neon
 |-neon-light
 | -black
 | -friday
 | -drug
 | -avengers
 | -shadow
 | -graffity
 | -scifi
 | -green-neon
 | -matrix
 | -glitch
 | -truth
 | -dare
 | -coinflip
 | -dropwater
 | -fact
 | -awesomecheck
 | -charactercheck
 | -bare
 | -neon-style
 | -greatcheck
 | -handsomechec
 └─────────◉   
      ];

      const formattedList = commandsList.map((cmd) => `- ${cmd}`).join("\n");
      const helpMessage = `Available logo commands:\n\n${formattedList}`;

      await vorterx.sendMessage(m.from, helpMessage, { quoted: m });
      return;
    }

    switch (command) {
      case 'black':
        !text) {
          await xReact("🤬");
          return m.reply("*Provide me a text bruh ex black vorterx*");
        }

        await xReact("👻");
        try {
          const url = "https://textpro.me/shiny-black-3d-text-effect-generator-1143.html";
          const response = await axios.get(url);
          const html = response.data;
          const anu = await maker.textpro(html, text);

          vorterx.sendMessage(m.from, {
            image: { url: anu.image },
            caption: `*Requested by*: *${pushName}*\n\n*Created by*: *${process.env.BOTNAME}*\n`
          }, { quoted: m });
        } catch (error) {
          console.error(error);
          await xReact("❌");
          return m.reply("An error occurred while generating the logo.");
        }
        break;
        
      case "drug":
        if (!text) {
          await xReact("🤬");
          return m.reply("*Provide me a text bruh ex neon vorterx*");
        }

        await xReact("👻");
        try {
          const url = "https://textpro.me/plastic-bag-drug-text-effect-867.html";
          const response = await axios.get(url);
          const html = response.data;
          const anu = await maker.textpro(html, text);

          vorterx.sendMessage(m.from, {
            image: { url: anu.image },
            caption: `*Requested by*: *${pushName}*\n\n*Created by*: *${process.env.BOTNAME}*\n`
          }, { quoted: m });
        } catch (error) {
          console.error(error);
          await xReact("❌");
          return m.reply("An error occurred while generating the logo.");
        }
        break;

      case "shadow":
        if (!text) {
          await xReact("🤬");
          return m.reply("*Provide me a text for the shadow effect*");
        }

        await xReact("👻");
        try {
          const url = "https://textpro.me/create-a-gradient-text-shadow-effect-online-1141.html";
          const response = await axios.get(url);
          const html = response.data;
          const anu = await maker.textpro(html, text);

          vorterx.sendMessage(m.from, {
            image: { url: anu.image },
            caption: `*Requested by*: *${pushName}*\n\n*Created by*: *${process.env.BOTNAME}*\n`
          }, { quoted: m });
        } catch (error) {
          console.error(error);
          await xReact("❌");
          return m.reply("An error occurred while generating the logo.");
        }
        break;

      case "friday":
        if (!text) {
          await xReact("🤬");
          return m.reply("*Please provide the text for the neon light effect*");
        }

        await xReact("👻");
        try {
          const url = "https://textpro.me/neon-light-style-3d-text-effect-online-1132.html";
          const response = await axios.get(url);
          const html = response.data;
          const anu = await maker.textpro(html, text);

          vorterx.sendMessage(m.from, {
            image: { url: anu.image },
            caption: `*Requested by*: *${pushName}*\n\n*Created by*: *${process.env.BOTNAME}*\n`
          }, { quoted: m });
        } catch (error) {
          console.error(error);
          await xReact("❌");
          return m.reply("An error occurred while generating the logo.");
        }
        break;
        
      default:
        await xReact("❌");
        return m.reply("Invalid logo command. Type 'logomaker help' to see available commands.");
    }
  },
};
