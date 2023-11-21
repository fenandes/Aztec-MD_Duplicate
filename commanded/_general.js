const send_Alive = require("../lib/plugins/_alive.js");

module.exports = {
  name: "alive",
  category: "General",
  description: "To check if the bot is alive",
  async xstart(vorterx, m,{xReact,text}) {
    await xReact("🧘");
    await send_Alive(vorterx, m);
  },
};
