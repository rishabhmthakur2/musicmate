var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
  const searchType = req.body.searchType;
  const searchFilter = req.body.searchFilter;
});

module.exports = router;
