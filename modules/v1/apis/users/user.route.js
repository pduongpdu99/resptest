const { Router } = require("express");
const { authenticateToken } = require("../../../../auth/auth.passport");

// controller
const UserController = require("./user.controller");
const UserRouter = Router();

const { userModel } = require("./users.schema");
userModel();

// get
UserRouter.get("/all", authenticateToken, UserController.selectAll);
UserRouter.get("/find/:id", authenticateToken, UserController.findId);
UserRouter.get(
  "/find/email/:email",
  authenticateToken,
  UserController.findByEmail
);

// post
UserRouter.post("/add", authenticateToken, UserController.add);
UserRouter.post("/sign-up", UserController.signUp);
UserRouter.post("/sign-in", UserController.signIn);
UserRouter.post("/sign-out", UserController.signOut);
UserRouter.post("/refresh-token", UserController.refreshToken);

// update
UserRouter.put("/update/:id", authenticateToken, UserController.updateById);

// delete
UserRouter.delete("/delete/:id", authenticateToken, UserController.removeById);

// export
module.exports = { UserRouter };
