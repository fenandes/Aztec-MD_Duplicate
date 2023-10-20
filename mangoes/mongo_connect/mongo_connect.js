const { sessionSchema } = require("./connicto");
module.exports = class Database {
  constructor() {}
  getSession = async (sessionId) => await this.session.findOne({ sessionId });
  session = sessionSchema;
 };
