const bcrypt = require("bcryptjs");
const { Logger } = require("./log");

const encrypt = (string) => {
  if (!string) return Logger.error("Dont receive string to hash on create");

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(string, salt);

  return hash;
};

const verify = (pass, hash) => {
  if (!pass) return Logger.error("Dont receive string to verify on create");

  let verify = bcrypt.compareSync(pass, hash);

  return verify;
};

module.exports = { encrypt, verify };
