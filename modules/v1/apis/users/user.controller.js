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
    console.log(params);
    res.status(200).json(await UserService.add(params));
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err });
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const signUp = async (req, res) => {
  try {
    const params = req.body;

    const userSignuped = await UserService.signUp(params);
    const { refreshToken } = userSignuped;

    // set cookie
    const _1day = 24 * 60 * 60 * 1000;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: _1day,
    });

    res.status(200).json(userSignuped);
  } catch (err) {
    res.status(500).json({ message: "500 Error signning up user", error: err });
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const signIn = async (req, res, next) => {
  try {
    const params = req.body;
    UserService.signIn(params).then((result) => {
      if (result) {
        req.loginStatus = result;
        next();
      } else {
        res.status(404).json({ message: "Not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "500 Error signning in user", error: err });
  }
};

/**
 * add method
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
 * add method
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
 * add method
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
      res.status(200).json(instance);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error find by id from users", error: err });
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const findByEmail = async (req, res) => {
  console.log("Over here");
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
  findByEmail,
};
