module.exports = {
  name: "antinumber",
  description: "To remv users anti_nubrs from group",
  category: "Group",

  on: false,
  async xstart(vorterx, m, { text,isBotAdmin,xReact }) {
    
    const isGroupMessage = m.isGroupMsg;
    const isAdmin = isGroupMessage ? await vorterx.isGroupAdmin(m.from) : true;
    if (!this.on || !isAdmin || !isGroupMessage) {
      if (text === "antinumber") {
        if (!isAdmin || !isGroupMessage) {
        vorterx.sendMessage(m.from, {text: "This command can only be used by group admins only"});
        } else {
        
        vorterx.sendMessage(m.from, { text: "Available commands:\n/✔️anti_number_on\n/✔️anti_number_off"});
        }
        }
        return;
       }

      const groupParticipants = text ? text.split(",") : ["+6412345678", "+9112345678", "+6212345678", "+9412345678", "+4412345678"];
      function removeAntiNumbers(participants) {
      const prefixes = ["+64", "+62", "+94"];
      const updatedParticipants = participants.filter(participant => {
      const countryCode = participant.substring(0, 3);
        if (prefixes.includes(countryCode)) {
          vorterx.sendMessage(m.from, {text:`Anti Number detected: ${participant}`});
          return false;
        }
        return true; 
      });
      return updatedParticipants;
     }

     const updatedParticipants = removeAntiNumbers(groupParticipants);
     m.reply("Updated participants:", updatedParticipants);
    }
    };

module.exports.anti_number_on = () => {
module.exports.on = true;
m.reply("🔊Anti_number has been activated");
};

module.exports.anti_number_off = () => {
module.exports.on = false;
m.reply("🔊Anti_number has been deactivated");
};
