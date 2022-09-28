/* eslint-disable no-undef */
const { KnexMiddleWare } = require("../../../../middleware/knex.middleware");
const {
  UserPreprocessUtil,
} = require("../../../../utils/user-preprocess.util");
const TokenService = require("../tokens/tokens.service");

// jwt passport
const jwt = require("jsonwebtoken");

// .env
const dotenv = require("dotenv");

// apply .env config
dotenv.config();

/**
 * select all
 * @returns
 */
const selectAll = async () => {
  try {
    return await KnexMiddleWare.select().from("users");
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
    return await KnexMiddleWare("users")
      .insert(params)
      .then((r) => {
        delete params.password;

        params.displayName = `${params.first_name} ${params.last_name}`;
        return {
          id: r[0],
          ...params,
        };
      });
  } catch (err) {
    return new Error("500 Internal error");
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
    // check email validation
    if (!UserPreprocessUtil.isEmailValidation(params.email))
      throw new Error("400 http code on validation error");

    // check valid password
    if (!UserPreprocessUtil.isValidPassword(params.password))
      throw new Error("400 http code on validation error");

    const password = params.password;
    params["password"] = await UserPreprocessUtil.hashPassword(password, 10);

    const userInstance = await findByEmail(params["email"]);
    const isEmpty = userInstance.length == 0;

    // check is empty then add object
    if (isEmpty) {
      return await KnexMiddleWare("users")
        .insert(params)
        .then((r) => {
          delete params.password;

          // combie first and last name
          params.display_name = `${params.first_name} ${params.last_name}`;

          // return user, token, refreshToken
          return {
            id: r[0],
            ...params,
          };
        });
    }

    // exist -> conflict
    return new Error("409 Conflict");
  } catch (err) {
    return err;
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
    // check email validation
    if (!UserPreprocessUtil.isEmailValidation(params.email))
      throw new Error("400 http code on validation error");

    // check password validation
    if (!UserPreprocessUtil.isValidPassword(params.password))
      throw new Error("400 http code on validation error");

    // pass
    return await KnexMiddleWare("users")
      .where({ email: params.email })
      .select()
      .then(async (rs) => {
        let check = false;
        let user = undefined;
        for (let index = 0; index < rs.length; index++) {
          const i = rs[index];
          user = rs[index];

          check = UserPreprocessUtil.compare(params.password, i.password);
          if (check) break;
        }

        // declare token variables
        let accessToken = undefined,
          refreshToken = undefined;

        // expires in
        const expiresInRefreshToken = "30d";
        const expiresInAccessToken = "1d";

        // declare options
        const options = {
          email: params.email,
        };

        // create accessToken
        accessToken = jwt.sign(options, process.env["ACCESS_TOKEN_SECRET"], {
          expiresIn: expiresInAccessToken,
        });

        // create refreshToken
        refreshToken = jwt.sign(options, process.env["REFRESH_TOKEN_SECRET"], {
          expiresIn: expiresInRefreshToken,
        });

        // token service is called to execute add method
        if (check) {
          const t = await TokenService.add({
            userId: user.id,
            refreshToken,
            expiresIn: expiresInRefreshToken,
          });

          // throw error
          if (t instanceof Error) throw t;
        } else {
          throw new Error("404: user not found");
        }

        // trả về kết quả email và password đúng --> true | false
        delete user["password"];
        return {
          user: user,
          token: accessToken,
          refreshToken,
        };
      });
  } catch (err) {
    return err;
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
    await KnexMiddleWare("users").where("id", "=", id).update(params);
    return {
      status: 200,
      message: "updated",
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
    return await KnexMiddleWare("users").where("id", "=", id).select();
  } catch (err) {
    return new Error("500 Internal error");
  }
};

/**
 * find by id method
 * @param {*} email
 * @method GET
 * @returns
 */
const findByEmail = async (email) => {
  try {
    return await KnexMiddleWare("users").where("email", "=", email).select();
  } catch (err) {
    return new Error("500 Internal error");
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
  findByEmail,
};
