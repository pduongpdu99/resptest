const TokenService = require("./tokens.service");

/**
 * select all
 * @param {*} req
 * @param {*} res
 */
const selectAll = async (req, res) => {
  try {
    res.status(200).json(await TokenService.selectAll());
  } catch (err) {
    res.status(500).json({ message: "Error getting Tokens", error: err });
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
    res.status(200).json(await TokenService.add(params));
  } catch (err) {
    res.status(500).json({ message: "Error adding Token", error: err });
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
    res.status(200).json(await TokenService.signUp(params));
  } catch (err) {
    res
      .status(500)
      .json({ message: "500 Error signning up Token", error: err });
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
    TokenService.signIn(params).then((result) => {
      if (result) {
        req.loginStatus = result;
        next();
      } else {
        res.status(404).json({ message: "Not found" });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "500 Error signning in Token", error: err });
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
    res.status(200).json(await TokenService.updateById(id, params));
  } catch (err) {
    res.status(500).json({ message: "Error updating Token by id", error: err });
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
    res.status(200).json(await TokenService.removeById(id));
  } catch (err) {
    res.status(500).json({ message: "Error removing Token by id", error: err });
  }
};

/**
 * add method
 * @param {*} req
 * @param {*} res
 */
const findId = async (req, res) => {
  try {
    const instance = await TokenService.findId(req.params.id);
    if (instance.length == 0) {
      // BUG: why not response this
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(instance);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error find by id from Tokens", error: err });
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
};
