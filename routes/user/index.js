const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/userController");


module.exports = () => {
    router.post("/v1/messages/new", UserController.addmessages);
    router.get("/v1/messages/sync", UserController.syncmessages);
    router.post("/auth/register",UserController.register)
    router.post("/auth/login",UserController.login)
    return router;
};

