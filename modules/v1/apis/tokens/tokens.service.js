const { KnexMiddleWare } = require("../../../../db/knex.db");
/**
 * select all
 * @returns
 */
const selectAll = async () => {
  try {
    // get all token with populate
    return await KnexMiddleWare("tokens").select();
  } catch (err) {
    return new Error("500 Internal error");
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
  } catch (e) {
    return e;
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
    return new Error("500 Internal error");
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
    return new Error("500 Internal error");
  }
};

/**
 * remove all token by user id
 * @param {*} userId
 * @returns
 */
const removeAllTokenByUserId = async (userId) => {
  try {
    // update by id
    await KnexMiddleWare("tokens").where("user_id", userId).del();
    return {
      status: 200,
      message: "remove sucess",
    };
  } catch (err) {
    return new Error("500 Internal error");
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
    return new Error("500 Internal error");
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const findToken = async ({ userId, refreshToken }) => {
  try {
    return await KnexMiddleWare("tokens")
      .where({
        user_id: userId,
        refresh_token: refreshToken,
      })
      .select();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  selectAll,
  add,
  removeById,
  updateById,
  findId,
  removeAllTokenByUserId,
  findToken,
};
