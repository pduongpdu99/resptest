const { Router } = require("express");

// controller
const UserController = require("./user.controller");
const UserRouter = Router();

const { userModel } = require("./users.schema");
userModel();

// get
UserRouter.get("/all", UserController.selectAll);
UserRouter.get("/find/:id", UserController.findId);
UserRouter.get("/find/email/:email", UserController.findByEmail);
// UserRouter.get("/");
// UserRouter.get("/find");

// post
UserRouter.post("/add", UserController.add);
UserRouter.post("/signup", UserController.signUp);
UserRouter.post(
  "/signin",
  // AuthPassport.afterJWT,
  UserController.signIn
);

// update
UserRouter.put("/update/:id", UserController.updateById);

// delete
UserRouter.delete("/delete/:id", UserController.removeById);

// export
module.exports = { UserRouter };
