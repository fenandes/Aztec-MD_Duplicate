const got = require("got");
const Heroku = require("heroku-client");
const config = require("../config.js");
const heroku = new Heroku({ token: config.HEROKU.API_KEY });
const baseURI = "/apps/" + Config.HEROKU.APP_NAME;
const { runtime } = require("../lib/index");

module.exports = {
  name: "command",
  description: "Heroku settings",
  category: "Owner",
  async xstart(vorterx, m, { xReact, text, isOwner, args, quoted }) {
    switch (args[0]) {
      case "restart":
        await xReact('🌚');
        await m.reply("*_🌚Aztec is Restarting now_*");
        await heroku.delete(baseURI + "/dynos").catch(async (error) => {
        await m.reply(`HEROKU : ${error.body.m}`);
        });
        break;

      case "shutdown":
        if (isOwner) {
          await xReact('😪');
          await heroku.get(baseURI + "/formation").then(async (formation) => {
          await m.reply(`*_😪Aztec is now Shutting down._*`);
          await heroku.patch(baseURI + "/formation/" + formation[0].id, {
              body: {
              quantity: 0,
              },
              });
              }).catch(async (error) => {
              await m.reply(`HEROKU : ${error.body.m}`);
           });}
          break;

      case "dyno":
        if (isOwner) {
          await xReact('🔋');
          heroku.get('/account').then(async (account) => {
          const url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota";
          const headers = {
          "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
          "Authorization": "Bearer " + config.HEROKU.API_KEY,
          "Accept": "application/vnd.heroku+json; version=3.account-quotas",
           };
            await got(url, { headers: headers }).then(async (res) => {
              const resp = JSON.parse(res.body);
              const total_quota = Math.floor(resp.account_quota);
              const quota_used = Math.floor(resp.quota_used);
              const percentage = Math.round((quota_used / total_quota) * 100);
              const remaining = total_quota - quota_used;
              await m.reply(
                "👩‍💻Total Quota" + ": ```" + runtime(total_quota) + "```\n\n" +
                "🔋Quota used" + ": ```" + runtime(quota_used) + "```\n" +
                "\n" +
                "💯Percentage" + ": ```" + percentage + "```\n\n" +
                "🔋Quota remaining" + ": ```" + runtime(remaining) + "```\n"
               );
               }).catch(async (err) => {
               await m.reply(err.m);
               });
              });
              }
             break;

      case "setvar":
        if (isOwner) {
          const match = args.slice(1).join(" ");
          if (!match)
          await xReact('❌');
          return await m.reply("*_Example: .setvar LANG: VO_TERX_*");
          const [key, value] = match.split(":");
          if (!key || !value) return await m.reply("*_Example: .setvar LANG: VO_TERX_*");
          await xReact('👩‍💻');
          await heroku.patch(baseURI + "/config-vars", {
          body: {
          [key.toUpperCase()]: value,
          },
          }).then(async () => {
          await m.reply("_" + key.toUpperCase() + ": " + value + "_");
          }).catch(async (error) => {
          await m.reply("HEROKU : " + error.body.m);
          });
          }
         break;

      case "delvar":
        if (isOwner) {
          const match = args.slice(1).join(" ");
          await xReact('❌');
          if (!match) return await m.reply("_Example: delvar LANG_");
          await xReact('👩‍💻');
          await heroku.get(baseURI + "/config-vars").then(async (vars) => {
          const key = match.trim().toUpperCase();
          if (vars[key]) {
          await heroku.patch(baseURI + "/config-vars", {
          body: {
          [key]: null,
           },
           });
           return await m.reply("_👩‍💻Deleted " + key + "_");
           }
           await m.reply("_" + key + " ❌Error not found_");
           }).catch(async (error) => {
           await m.reply("HEROKU : " + error.body.m);
           });
           }
          break;

         default:

         break;
        }},
        };
