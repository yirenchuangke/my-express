var express = require("express");
var router = express.Router();
var db = require("../db/mysql.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // 查询实例
  db.query("select * from user", [], function (result, fields) {
    console.log("查询结果：", result);
    res.send(result);
  });
});
/* GET users listing. */
router.get("/roles", function (req, res, next) {
  // 查询实例
  db.query("select * from roles", [], function (result, fields) {
    console.log("查询结果：", result);
    res.send(result);
  });
});
router.get("/addMenu", function (req, res, next) {
  let { menuName, type, fatherId } = req.query;
  // 查询实例
  db.query(
    "INSERT INTO menus(menuName, type,fatherId) VALUES(?, ?,?)",
    [menuName, type, fatherId],
    function (result, fields) {
      console.log("查询结果：", result);
      res.send(result);
    }
  );
});
module.exports = router;
