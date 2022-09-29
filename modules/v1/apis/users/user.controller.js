const UserService = require("./user.service");

/**
 * select all
 * @param {*} req
 * @param {*} res
 */
const selectAll = async (req, res) => {
  try {
    res.status(200).json(await UserService.selectAll());
  } catch (err) {
    res.status(500).json({ message: "Error getting users", error: err });
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const add = async (req, res) => {
  try {
    const params = req.body;
    res.status(200).json(await UserService.add(params));
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err });
  }
};

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

    const { refreshToken } = userSignuped;

    // set cookie
    const _1day = 24 * 60 * 60 * 1000;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: _1day,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: _1day,
    });

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
    UserService.signIn(params).then((result) => {
      if (!(result instanceof Error)) {
        // set result.refreshToken into cookie
        res.cookie("jwt", result.refreshToken);

        // render json result
        res.status(200).json(result);
      } else {
        // get status code
        const status = result.message.toLowerCase().includes("conflict")
          ? 409
          : result.message.toLowerCase().includes("not found")
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
 * sign out method
 * @param {*} req
 * @param {*} res
 */
const signOut = async (req, res) => {
  try {
    UserService.signOut(req.headers["authorization"]).then((result) => {
      if (!(result instanceof Error)) {
        // set result.refreshToken into cookie
        res.clearCookie("jwt");

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
    UserService.refreshToken(req.body).then((result) => {
      if (!(result instanceof Error)) {
        // render json result
        res.status(200).json(result);
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

/**
 * update by id method
 * @param {*} req
 * @param {*} res
 */
const updateById = async (req, res) => {
  try {
    const params = req.body;
    const id = req.params.id;
    res.status(200).json(await UserService.updateById(id, params));
  } catch (err) {
    res.status(500).json({ message: "Error updating user by id", error: err });
  }
};

/**
 * remove by id method
 * @param {*} req
 * @param {*} res
 */
const removeById = async (req, res) => {
  try {
    const id = req.params.id;
    res.status(200).json(await UserService.removeById(id));
  } catch (err) {
    res.status(500).json({ message: "Error removing user by id", error: err });
  }
};

/**
 * find id method
 * @param {*} req
 * @param {*} res
 */
const findId = async (req, res) => {
  try {
    const instance = await UserService.findId(req.params.id);
    if (instance.length == 0) {
      // BUG: why not response this
      res.status(404).json({ message: "Not found", status: 404 });
    } else {
      res.status(200).json(instance[0]);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error find by id from users", error: err });
  }
};

/**
 * find by email method
 * @param {*} req
 * @param {*} res
 */
const findByEmail = async (req, res) => {
  try {
    const instance = await UserService.findByEmail(req.params.email);
    if (instance.length == 0) {
      // BUG: why not response this
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(instance[0]);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error find by id from users", error: err });
  }
};

module.exports = {
  selectAll,
  add,
  updateById,
  removeById,
  findId,
  signUp,
  signIn,
  signOut,
  refreshToken,
  findByEmail,
};
