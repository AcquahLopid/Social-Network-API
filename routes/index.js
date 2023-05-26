const route = require("express").Router();
const API = require("./api")

route.use("/api", API);

module.exports = route;