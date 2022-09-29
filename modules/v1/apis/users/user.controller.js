const { attach } = require("../../../../utils/jwt.util");
const UserService = require("./user.service");
const TokenService = require("../tokens/tokens.service");

const crypto = require("crypto");

/**
 * sign up method
 * @param {*} req
 * @param {*} res
 */
const signUp = async (req, res) => {
  try {
    const params = req.body;

    const userSignuped = await UserService.signUp(params);
    if (userSignuped instanceof Error) throw userSignuped;

    res.status(200).json(userSignuped);
  } catch (err) {
    // get status code
    const status = err.message.toLowerCase().includes("conflict")
      ? 409
      : err.message.toLowerCase().includes("validation")
      ? 400
      : 500;

    res
      .status(status)
      .json({ message: err.message, name: err.name, stack: err.stack });
  }
};

/**
 * sign in method
 * @param {*} req
 * @param {*} res
 */
const signIn = async (req, res) => {
  try {
    const params = req.body;
    UserService.signIn(params).then(async (result) => {
      if (result) {
        // user
        const payload = result.id;
        const refreshToken = crypto.randomBytes(64).toString("HEX");

        // create token
        attach({ res, payload, refreshToken });

        const tokenInstance = await TokenService.add({
          user_id: result.id,
          refresh_token: refreshToken,
          expires_in: "30d",
        });

        // render json result
        res.status(200).json({
          user: result,
          token: req.signedCookies.access_token,
          refresh_token: tokenInstance.refresh_token,
        });
      } else {
        res.status(400).json({ message: "400 http code on validation error" });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "500 http code on internal error", error: err });
  }
};

/**
 * sign out method
 * @param {*} req
 * @param {*} res
 */
const signOut = async (req, res) => {
  try {
    UserService.signOut().then(async (result) => {
      if (!(result instanceof Error)) {
        // remove token
        res.clearCookie("access_token", { httpOnly: true });
        res.clearCookie("refresh_token", { httpOnly: true });

        // // remove token in db
        TokenService.removeAllTokenByUserId(req.user);

        // render json result
        res.status(200).json(result);
      } else {
        // get status code
        const status = result.message.toLowerCase().includes("not found")
          ? 404
          : 400;

        // response
        res.status(status).send({
          message: result.message,
          name: result.name,
          stack: result.stack,
        });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "500 http code on internal error", error: err });
  }
};

/**
 * refresh token
 * @param {*} req
 * @param {*} res
 */
const refreshToken = (req, res) => {
  try {
    UserService.refreshToken(req.body).then(async (result) => {
      if (!(result instanceof Error)) {
        const payload = result.user_id;

        await TokenService.updateById(result.id, { user_id: result.user_id });

        // create token
        attach({ res, payload, refreshToken: req.body.refresh_token });

        // render json result
        res.status(200).json({
          token: req.signedCookies.access_token,
          refresh_token: req.body.refresh_token,
        });
      } else {
        // get status code
        const status = 404;

        // response
        res.status(status).send({
          message: result.message,
          name: result.name,
          stack: result.stack,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "500 - internal error", error: err });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  refreshToken,
};
