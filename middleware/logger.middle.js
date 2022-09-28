const dotenv = require("dotenv");
const dotENV = dotenv.config().parsed;

/**
 * log server run status when run dev
 */
exports.serverRunLogging = function () {
  console.log(`Server run at: http://${dotENV["IP"]}:${dotENV["PORT"]}`);
};
