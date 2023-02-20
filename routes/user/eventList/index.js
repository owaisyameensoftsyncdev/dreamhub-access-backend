const express = require("express");
const eventList = require("./eventList");


const router = express.Router();


router.get("/getevents", eventList);


module.exports = router;