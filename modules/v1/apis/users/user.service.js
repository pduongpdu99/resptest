/* eslint-disable no-undef */
const { KnexMiddleWare } = require("../../../../db/knex.db");
const {
  UserPreprocessUtil,
} = require("../../../../utils/user-preprocess.util");

// .env
const dotenv = require("dotenv");

// apply .env config
dotenv.config();

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

    // get password hashed
    params["password"] = await UserPreprocessUtil.hashPassword(password, 10);

    // find user by email
    const userInstance = await findByEmail(params["email"]);

    // check user is not exist
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
        for (let index = 0; index < rs.length; index++) {
          const i = rs[index];
          let user = rs[index];
          check = UserPreprocessUtil.compare(params.password, i.password);
          if (check) {
            delete user["password"];
            return user;
          }
        }

        // trả về kết quả email và password đúng --> true | false
        return null;
      });
  } catch (err) {
    return err;
  }
};

/**
 * sign out method
 * @param {*} params
 * @method POST
 * @returns
 */
const signOut = async () => {
  // remove all in tokens by user id
  return {
    message: "Sign out sucess",
    statusCode: 204,
  };
};

/**
 * sign out method
 * @param {*} params
 * @method POST
 * @returns
 */
const refreshToken = async (params) => {
  const instances = await KnexMiddleWare("tokens")
    .where("refresh_token", params.refresh_token)
    .select();

  // 404 - token not found
  if (instances.length == 0) return new Error("404 - token not found");

  // 200 - refresh token sucess
  let user_id = instances[0].user_id;
  const id = instances[0].id;

  // render content
  return {
    user_id,
    id,
  };
};

/**
 * find by id method
 * @param {*} email
 * @method GET
 * @returns
 */
const findByEmail = async (email) => {
  try {
    // response user by email
    return await KnexMiddleWare("users").where("email", "=", email).select();
  } catch (err) {
    return new Error("500 Internal error");
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  refreshToken,
};
