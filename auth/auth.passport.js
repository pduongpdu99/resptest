/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const jwt = require("jsonwebtoken");

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
