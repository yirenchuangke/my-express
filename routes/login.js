var express = require("express");
var router = express.Router();
var db = require("../db/mysql.js");

/* GET users listing. */
router.post("/login", function (req, res, next) {
  // 查询实例
  db.query("select * from user", [], function (result, fields) {
    console.log("查询结果：", result);
    res.send(result);
  });
});

module.exports = router;
