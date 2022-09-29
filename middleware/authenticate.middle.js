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
    if (access_token) {
      const payload = verifyJWT(access_token);
      req.user = payload;
      return next();
    }

    const payload = verifyJWT(refresh_token);
    console.log(payload);
    const tokens = await TokenService.findToken({
      userId: payload.user,
      refreshToken: payload.refreshToken,
    });
    console.log(tokens.length === 0);

    if (tokens.length === 0) return new Error("401 unauthorized");

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
