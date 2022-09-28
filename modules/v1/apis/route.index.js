const express = require("express");
// const authPassport = require("../../../auth/auth.passport");
const { UserRouter } = require("./users/user.route");
const { TokenRouter } = require("./tokens/tokens.route");

const router = express.Router();


// no auth passport
router.use("/users", UserRouter);
router.use("/tokens", TokenRouter);

module.exports = router;