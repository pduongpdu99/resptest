const { KnexMiddleWare } = require("../../../../middleware/knex.middleware");

/**
 * user model init
 */
const userModel = () =>
  KnexMiddleWare.schema
    .createTableIfNotExists("users", (table) => {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("email").unique();
      table.string("password");
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
  userModel,
};
