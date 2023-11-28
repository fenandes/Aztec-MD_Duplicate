function imgur(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let subString = '';
  for (let i = 0; i < length; i++) {
    subString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return subString;
}

module.exports = { imgur };
