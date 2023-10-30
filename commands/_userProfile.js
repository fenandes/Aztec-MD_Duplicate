const { fetchStatus, profilePictureUrl } = require('../mangoes/myFunc.js');

module.exports = {
  name: "profile",
  description: "Shows your profile pic information",
  category: "user",
  async xstart(vorterx, m,{xReact}) {

    await xReact("😘");
    const userName = m.pushName;

    const user = m.sender;
    const userStatus = await fetchStatus(user);
    const userProfilePic = await profilePictureUrl(user, 'image');
    const userProfileBio = userStatus.status;
    const userLevel = (await Levels.fetch(user, "bot")).level;
    const userGroups = vorterx.chats.filter(chat => chat.isGroup).length;
    const countryCode = m.chat.slice(0, 2);
    let role = 'Warrior';

    if (userLevel <= 2) role = 'Elite III';
    else if (userLevel <= 4) role = 'Elite II';
    else if (userLevel <= 6) role = 'Elite I';
    else if (userLevel <= 8) role = 'Master IV';
    else if (userLevel <= 10) role = 'Master III';
    else if (userLevel <= 12) role = 'Master II';
    else if (userLevel <= 14) role = 'Master I';
    else if (userLevel <= 16) role = 'Grandmaster V';
    else if (userLevel <= 18) role = 'Grandmaster IV';

    const caption = `🔥🌟⚡️ *User Profile* ⚡️🌟🔥\n\n` +
      `👤 *Name:* ${userName}\n` +
      `💬 *Contact:* ${m.sender.split('@')[0]}\n` +
      `🌍 *Country Code:* ${countryCode}\n\n` + //Shows your country code
      `📝 *Description:*\n${userProfileBio}\n\n` +
      `💰 *Balance:* ${userLevel.xp}\n` +
      `🎖️ *Level:* ${userLevel}\n` +
      `🏆 *Role:* ${role}\n` +
      `👥 *Groups:* ${userGroups}\n`; //This shows how many groups you're in

    const mediaType = { image: { url: userProfilePic } };
    return vorterx.sendMessage(m.from, mediaType, { caption: caption, quoted: m });
   }
 };
