const express = require("express");
// const authPassport = require("../../../auth/auth.passport");
const { UserRouter } = require("./users/user.route");
const { TokenRouter } = require("./tokens/tokens.route");

const router = express.Router();


// no auth passport
router.use("/users", UserRouter);
router.use("/tokens", TokenRouter);

// auth passport
// router.use("/guests", authPassport(), guestRouter);
// router.use("/evaluates", authPassport(), evaluateRouter);
// router.use("/categories", authPassport(), categoryRouter);
// router.use("/blogs", authPassport(), blogRouter);

module.exports = router;