var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { signup, signin } = require("./controller");

/* GET home page. */
router.post("/sign-up", multer({dest: os.tmpdir()}).single('image'), signup);
router.post("/sign-in", signin);

module.exports = router;
