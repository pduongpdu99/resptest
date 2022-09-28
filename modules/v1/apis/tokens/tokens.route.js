const { Router } = require("express");
const {
  verifyJWT,
  afterVerifyJWT,
} = require("../../../../middleware/verifyJWT");

// controller
const TokenController = require("./tokens.controller");
const TokenRouter = Router();

const { tokenModel } = require("./tokens.schema");
tokenModel();

// get
TokenRouter.get("/all", verifyJWT, afterVerifyJWT, TokenController.selectAll);
TokenRouter.get("/find/:id", TokenController.findId);

// post
TokenRouter.post("/add", TokenController.add);
TokenRouter.post("/find/user", TokenController.findUserByToken);

// update
TokenRouter.put("/update/:id", TokenController.updateById);

// delete
TokenRouter.delete("/delete/:id", TokenController.removeById);

// export
module.exports = { TokenRouter };
