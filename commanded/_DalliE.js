const search_DalliE = require("../lib/plugins/_Dalli-E.js");

module.exports = {
  name: 'imagine',
  alias: ['dalle'],
  description: 'An open ai dalle-E',
  category: 'Open Ai',
  async xstart(vorterx, m, { xReact, text}) {
    await search_DalliE(vorterx, m);
  },
};
