var express = require("express");
var router = express.Router();
const { landingPage, detailPage, category } = require("./controller");

/* GET home page. */
router.get("/landing-page", landingPage);
router.get("/detail/:id", detailPage);
router.get("/category", category);

module.exports = router;
