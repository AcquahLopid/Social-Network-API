const route = require("express").Router();
const user = require("./user");
const thought = require("./thought");

route.use("/users", user);
route.use("/thoughts", thought);

module.exports = route;
