const { KnexMiddleWare } = require("../../../../middleware/knex.middleware");
const {
  UserPreprocessUtil,
} = require("../../../../utils/user-preprocess.util");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

/**
 * select all
 * @returns
 */
const selectAll = async () => {
  try {
    return await KnexMiddleWare.select().from("users");
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
    return await KnexMiddleWare("users")
      .insert(params)
      .then((r) => {
        delete params.password;

        params.displayName = `${params.firstName} ${params.lastName}`;
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
 * sign up method
 * @param {*} params
 * @method POST
 * @returns
 */
const signUp = async (params) => {
  try {
    const password = params.password;
    params["password"] = await UserPreprocessUtil.hashPassword(password, 10);

    return await KnexMiddleWare("users")
      .insert(params)
      .then((r) => {
        delete params.password;

        params.displayName = `${params.firstName} ${params.lastName}`;
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
 * sign in method
 * @param {*} params
 * @method POST
 * @returns
 */
const signIn = async (params) => {
  try {
    return await KnexMiddleWare("users")
      .where({ email: params.email })
      .select()
      .then((rs) => {
        let check = false;
        for (let index = 0; index < rs.length; index++) {
          const i = rs[index];
          check = UserPreprocessUtil.compare(params.password, i.password);
          if (check) break;
        }

        // create jwt
        // const accessToken = jwt.sign(
        //   {
        //     email: params.email,
        //   },
        //   dotenv.parsed["ACCESS_TOKEN_SECRET"],
        //   { expiresIn: "30s" }
        // );

        // const refreshToken = jwt.sign(
        //   {
        //     email: params.email,
        //   },
        //   dotenv.parsed["REFRESH_TOKEN_SECRET"],
        //   { expiresIn: "1d" }
        // );

        // trả về kết quả email và password đúng --> true | false
        return check;
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
    await KnexMiddleWare("users").where("id", "=", id).del();
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
    await KnexMiddleWare("users").where("id", "=", id).update(params);
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
    return await KnexMiddleWare("users").where("id", "=", id).select();
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
  signUp,
  signIn,
};
