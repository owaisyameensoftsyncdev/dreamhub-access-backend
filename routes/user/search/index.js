const express = require("express");
const searchevent = require("./get");


const router = express.Router();


router.get("/search", searchevent);


module.exports = router;