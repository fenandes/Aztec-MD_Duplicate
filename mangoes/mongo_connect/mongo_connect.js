const { sessionSchema } = require("./connicto/SessionSchema.js");
const { sessionSchema } = require("./connicto/core.js");

module.exports = class Database {
  constructor() {}
  getSession = async (sessionId) => await this.session.findOne({ sessionId });
  session = sessionSchema;
 };
