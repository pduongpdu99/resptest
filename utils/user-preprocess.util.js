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
   * check password valid
   * @param {*} password 
   * @returns 
   */
  static isValidPassword(password) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  /**
   * check email valid
   * @param {*} password 
   * @returns 
   */
   static isEmailValidation(password) {
    var re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(password);
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
