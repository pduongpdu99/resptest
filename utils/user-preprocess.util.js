const md5 = require("md5");
const bcrypt = require("bcrypt");

class UserPreprocessUtil {
  constructor() {}

  /**
   * convert to kind md5 password
   * @param {*} password
   * @returns
   */
  static convertToMD5(password) {
    return md5(password);
  }

  /**
   * convert to kind md5 password
   * @param {*} password
   * @returns
   */
  static async hashPassword(password, s) {
    const salt = await bcrypt.genSalt(s);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  /**
   * compare
   * @param {*} password
   * @param {*} passwordHash
   * @returns
   */
  static compare(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  }
}

module.exports = {
  UserPreprocessUtil,
};
