const express = require("express");
const router = express.Router();
const MessageController = require("../../controllers/messageController");


module.exports = () => {
    router.post("/message/new", MessageController.addOneMessage);
        router.get("/messages/sync", MessageController.syncmessages);
    return router;
};

