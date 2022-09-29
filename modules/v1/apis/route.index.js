const express = require("express");
// const authPassport = require("../../../auth/auth.passport");
const { UserRouter } = require("./users/user.route");
const { TokenRouter } = require("./tokens/tokens.route");
const { authenticateUser } = require("../../../middleware/authenticate.middle");

const router = express.Router();


// no auth passport
router.use("/users", UserRouter);
router.use("/tokens", authenticateUser, TokenRouter);

module.exports = router;