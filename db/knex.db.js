const dotenv = require("dotenv");
const dotENV = dotenv.config().parsed;

const KnexMiddleWare = require("knex")({
  client: "mysql",
  connection: {
    host: dotENV["HOST"],
    port: dotENV["SV_PORT"],
    user: dotENV["USER"],
    password: dotENV["PASSWORD"],
    database: dotENV["DATABASE"],
  },
});

module.exports = {
  KnexMiddleWare,
};
