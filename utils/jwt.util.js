/* eslint-disable no-undef */
// jwt passport
const jwt = require("jsonwebtoken");

// .env
const dotenv = require("dotenv");

// apply .env config
dotenv.config();

// TODO: verify token
// TODO: generate token
// TODO: attach

/**
 * verify jwt
 * @param {*} payload
 */
const verifyJWT = (payload) => {
  return jwt.verify(payload, process.env["SECRET"]);
};

/**
 * generate token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env["SECRET"]);
};

/**
 * attach: định kèm jwt token -> cookie
 * @param {*} param0
 */
const attach = ({ res, payload, refreshToken }) => {
  const accessTokenJWT = generateToken(payload);
  const refreshTokenJWT = generateToken({ user: payload, refreshToken });

  const _60m = 1000 * 60 * 60;
  const _30d = 1000 * 60 * 60 * 24 * 30;

  // set cookie access token
  res.cookie("access_token", accessTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + _60m),
  });

  // set cookie refresh token
  res.cookie("refresh_token", refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + _30d),
  });
};

module.exports = {
  verifyJWT,
  generateToken,
  attach,
};
