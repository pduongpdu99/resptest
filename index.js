/* eslint-disable no-undef */
// dependencies
const express = require("express");
const http = require("http");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

// local source
const { serverRunLogging } = require("./middleware/logger.middle");
const routerIndex = require("./modules/v1/apis/route.index");

// init server
const app = express();
const server = http.createServer(app);

// plugins
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env["SECRET"]));

// router
app.use("/v1", routerIndex);

// listen
server.listen(process.env["PORT"], process.env["IP"], serverRunLogging);
