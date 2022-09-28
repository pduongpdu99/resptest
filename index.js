const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

const { serverRunLogging } = require("./middleware/logger.middle");
const routerIndex = require("./modules/v1/apis/route.index");

const app = express();
const server = http.createServer(app);

const dotENV = dotenv.config().parsed;
// plugins
app.use(cors());
app.use(express.json());

// router
app.use("/v1", routerIndex);

// listen
server.listen(dotENV["PORT"], dotENV["IP"], serverRunLogging);
