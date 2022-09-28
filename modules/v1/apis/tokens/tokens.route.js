const { Router } = require("express");
const { authenticateToken } = require("../../../../auth/auth.passport");

// controller
const TokenController = require("./tokens.controller");
const TokenRouter = Router();

const { tokenModel } = require("./tokens.schema");
tokenModel();

// get
TokenRouter.get("/all", authenticateToken, TokenController.selectAll);
TokenRouter.get("/find/:id", authenticateToken, TokenController.findId);

// post
TokenRouter.post("/add", authenticateToken, TokenController.add);
TokenRouter.post(
  "/find/user",
  authenticateToken,
  TokenController.findUserByToken
);

// update
TokenRouter.put("/update/:id", authenticateToken, TokenController.updateById);

// delete
TokenRouter.delete(
  "/delete/:id",
  authenticateToken,
  TokenController.removeById
);

// export
module.exports = { TokenRouter };
