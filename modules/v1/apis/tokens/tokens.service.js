const { KnexMiddleWare } = require("../../../../middleware/knex.middleware");
const knex_populate = require("knex-populate");
/**
 * select all
 * @returns
 */
const selectAll = async () => {
  try {

    // get all token with populate
    return await knex_populate(KnexMiddleWare, "tokens")
      .find()
      .populate("users", "id", "userId")
      .exec()
      .then((objects) =>
        objects.map((obj) => {
          let users = obj.userId;
          delete obj.userId;

          return {
            userId: users[0],
            ...obj,
          };
        })
      );
  } catch (err) {
    return {
      status: 500,
      ...{ message: "500 Internal error", error: err },
    };
  }
};

/**
 * add method
 * @param {*} params
 * @method POST
 * @returns
 */
const add = async (params) => {
  try {
    return await KnexMiddleWare("tokens")
      .insert(params)
      .then((r) => {
        return {
          id: r[0],
          ...params,
        };
      });
  } catch (err) {
    return {
      status: 500,
      ...{ message: "500 Internal error", error: err },
    };
  }
};

/**
 * remove method
 * @param {*} id
 * @method DELETE
 * @returns
 */
const removeById = async (id) => {
  try {
    await KnexMiddleWare("tokens").where("id", "=", id).del();
    return {
      status: 200,
      message: "deleted",
    };
  } catch (err) {
    return {
      status: 500,
      ...{ message: "500 Internal error", error: err },
    };
  }
};

/**
 * update method
 * @param {*} id
 * @param {*} params
 * @method PUT
 * @returns
 */
const updateById = async (id, params) => {
  try {
    // remove id property
    delete params.id;

    // update by id
    await KnexMiddleWare("tokens").where("id", "=", id).update(params);
    return {
      status: 200,
      message: "updated",
    };
  } catch (err) {
    return {
      status: 500,
      ...{ message: "500 Internal error", error: err },
    };
  }
};

/**
 * find by id method
 * @param {*} id
 * @method GET
 * @returns
 */
const findId = async (id) => {
  try {
    return await KnexMiddleWare("tokens").where("id", "=", id).select();
  } catch (err) {
    return {
      status: 500,
      ...{ message: "500 Internal error", error: err },
    };
  }
};

module.exports = {
  selectAll,
  add,
  removeById,
  updateById,
  findId,
};
