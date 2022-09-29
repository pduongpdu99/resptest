const { Router } = require("express");
const {
  authenticateUser,
} = require("../../../../middleware/authenticate.middle");

// controller
const TokenController = require("./tokens.controller");
const TokenRouter = Router();

const { tokenModel } = require("./tokens.schema");
tokenModel();

// get
TokenRouter.get("/all", authenticateUser, TokenController.selectAll);
TokenRouter.get("/find/:id", authenticateUser, TokenController.findId);

// post
TokenRouter.post("/add", authenticateUser, TokenController.add);

// update
TokenRouter.put("/update/:id", authenticateUser, TokenController.updateById);

// delete
TokenRouter.delete("/delete/:id", authenticateUser, TokenController.removeById);

// export
module.exports = { TokenRouter };
