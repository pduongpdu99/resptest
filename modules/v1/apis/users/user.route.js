const { Router } = require("express");
const { authenticateUser } = require("../../../../middleware/authenticate.middle");

// controller
const UserController = require("./user.controller");
const UserRouter = Router();

const { userModel } = require("./users.schema");
userModel();


// post
UserRouter.post("/sign-up", UserController.signUp);
UserRouter.post("/sign-in", UserController.signIn);
UserRouter.post("/refresh-token", UserController.refreshToken);

// delete
UserRouter.delete("/sign-out", authenticateUser, UserController.signOut);

// export
module.exports = { UserRouter };
