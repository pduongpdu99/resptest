const { Router } = require("express");

// controller
const TokenController = require("./tokens.controller");
const TokenRouter = Router();

const { userModel } = require("./tokens.schema");
userModel();

// get
TokenRouter.get("/all", TokenController.selectAll);
TokenRouter.get("/find/:id", TokenController.findId);
// TokenRouter.get("/");
// TokenRouter.get("/find");

// post
TokenRouter.post("/add", TokenController.add);

// update
TokenRouter.put("/update/:id", TokenController.updateById);

// delete
TokenRouter.delete("/delete/:id", TokenController.removeById);

// export
module.exports = { TokenRouter };
