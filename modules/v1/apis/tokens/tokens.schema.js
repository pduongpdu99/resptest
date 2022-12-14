const { KnexMiddleWare } = require("../../../../db/knex.db");

/**
 * token model init
 */
const tokenModel = () =>
  KnexMiddleWare.schema
    .createTableIfNotExists("tokens", (table) => {
      table.increments("id").primary();
      table.integer("user_id").references('users.id').notNullable();
      table.string("refresh_token").unique();
      table.string("expires_in");
      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(KnexMiddleWare.raw("CURRENT_TIMESTAMP"));

      table
        .dateTime("updated_at")
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
