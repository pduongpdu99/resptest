const { verifyJWT, attach } = require("../utils/jwt.util");
const TokenService = require("../modules/v1/apis/tokens/tokens.service");

/**
 * authenticate user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateUser = async (req, res, next) => {
  const { access_token, refresh_token } = req.signedCookies;

  try {
    // use access token if not empty
    if (access_token) {
      const payload = verifyJWT(access_token);
      req.user = payload;
      return next();
    }

    // else use refresh token
    const payload = verifyJWT(refresh_token);
    const tokens = await TokenService.findToken({
      userId: payload.user,
      refreshToken: payload.refreshToken,
    });

    // return error
    if (tokens.length === 0) return new Error("401 unauthorized");

    // generate access and refresh token
    attach({
      res,
      payload: payload.user,
      refreshToken: tokens[0].refresh_token,
    });

    req.user = payload.user;

    next();
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  authenticateUser,
};
