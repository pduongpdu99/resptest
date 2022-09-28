const { Router } = require("express");
const AuthPassport = require("../../../../auth/auth.passport");

// controller
const UserController = require("./user.controller");
const UserRouter = Router();

const { userModel } = require("./users.schema");
userModel();

// get
UserRouter.get("/all", UserController.selectAll);
UserRouter.get("/find/:id", UserController.findId);
// UserRouter.get("/");
// UserRouter.get("/find");

// post
UserRouter.post("/add", UserController.add);
UserRouter.post("/signup", UserController.signUp);
UserRouter.post(
  "/signin",
  AuthPassport.createJWT,
  AuthPassport.afterJWT,
  UserController.signIn
);

// update
UserRouter.put("/update/:id", UserController.updateById);

// delete
UserRouter.delete("/delete/:id", UserController.removeById);

// export
module.exports = { UserRouter };
