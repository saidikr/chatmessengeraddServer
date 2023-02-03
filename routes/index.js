const express = require("express");
const usersRoutes = require("./user");
const messagesRoutes = require("./message");
const groupRoutes = require("./group");
const router = express.Router();


// get allproducts
module.exports = () => {
  router.use("/api", groupRoutes(),usersRoutes(),messagesRoutes());
  return router;
};
