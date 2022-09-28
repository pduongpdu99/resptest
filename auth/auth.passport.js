/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { cookieParse } = require("../utils/cookie.util");

// const { handleErrors, handleNotFoundErrors } = require("../utils/error.util");
// const { UserService } = require("../modules/v1/api/users/users.service");
// const { RoleService } = require("../modules/v1/api/roles/roles.service");
// const { UserSchema } = require("../modules/v1/api/users/users.model");
// const { RoleSchema } = require("../modules/v1/api/roles/roles.schema");

// const userProjections = require("../modules/v1/api/users/users.projection");
// const roleProjections = require("../modules/v1/api/roles/roles.projection");

// const userServices = new UserService("User", UserSchema, userProjections);
// const roleServices = new RoleService("Role", RoleSchema, roleProjections);

// /**
//  * allow api with role
//  * @param {*} req
//  * @param {*} roleNumber
//  * @returns
//  */
// const allowAPI = async (req, roleNumber) => {
//   // get roles theo role
//   const roles = await roleServices.get({ role: roleNumber });
//   // check path api
//   const value =
//     roles
//       .map((role) => role.postfix)
//       .filter((postfix) => postfix.includes(req.originalUrl)).length > 0;
//   return value;
// };

// /**
//  * auth passport
//  * @returns
//  */
// const authPassport = () => {
//   return async (req, res, next) => {
//     const isExist = req.headers.auth != null;
//     if (isExist) {
//       // find user by token
//       const users = await userServices.get({ authToken: req.headers.auth });

//       // check exist any users
//       if (users && users.length > 0) {
//         // get first user
//         const user = users[0];

//         // delete user list from get api
//         delete users;

//         // get role
//         const role = user.role;
//         const allowStatus = await allowAPI(req, role);

//         // allow api
//         if (allowStatus == true) {
//           next();
//           return;
//         } else return handleNotFoundErrors(res);
//       } else {
//         return handleErrors(res);
//       }
//     } else {
//       return handleErrors(res);
//     }
//   };
// };

/**
 * authenticate token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function authenticateToken(req, res, next) {
  if (req.headers["authorization"]) {
    const authHeader = req.headers["authorization"];
    let token = authHeader.split(" ")[1];
    if (token == null || token == undefined) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(500);
  }
}

module.exports = {
  authenticateToken,
};
