const express = require("express");
const usersRoutes = require("./user");
const messagesRoutes = require("./message");
const router = express.Router();


// get allproducts
module.exports = () => {
  router.use("/api", usersRoutes(),messagesRoutes());
  return router;
};
