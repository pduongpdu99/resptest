const { KnexMiddleWare } = require("../../../../middleware/knex.middleware");

/**
 * token model init
 */
const tokenModel = () =>
  KnexMiddleWare.schema
    .createTableIfNotExists("tokens", (table) => {
      table.increments("id").primary();
      table.string("userId");
      table.string("refreshToken").unique();
      table.string("expiresIn");
      table
        .dateTime("createdAt")
        .notNullable()
        .defaultTo(KnexMiddleWare.raw("CURRENT_TIMESTAMP"));
      table
        .dateTime("updatedAt")
        .notNullable()
        .defaultTo(
          KnexMiddleWare.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
        );
    })
    .then((d) => d)
    .catch((e) => e);

module.exports = {
  tokenModel,
};
