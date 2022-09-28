var { expressjwt: jwt } = require("express-jwt");
const { cookieParse } = require("../utils/cookie.util");
require("dotenv").config();

/**
 * verify jwt
 * @param {*} _req
 * @param {*} _res
 * @param {*} _next
 */
// eslint-disable-next-line no-unused-vars
const verifyJWT = jwt({
  // eslint-disable-next-line no-undef
  secret: process.env["REFRESH_TOKEN_SECRET"],
  algorithms: ["HS256"],
});

const afterVerifyJWT = (_req, _res, _next) => {
  // get cookie
  const cookie = cookieParse(_req.headers["cookie"]);
  console.log(cookie);
  _next();
};

module.exports = {
  verifyJWT,
  afterVerifyJWT,
};
