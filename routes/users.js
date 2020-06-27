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

router.post("/login", function (req, res, next) {
  let { username, password } = req.body;

  // 查询实例
  db.query("select * from user", [], function (result, fields) {
    console.log("查询结果：", username, password, result[0].userName);
    let data = result[0];
    if (data.userName !== username) {
      res.send({
        code: 500,
        data: {},
        msg: "用户名不能为空",
      });
    }else if (data.password !== password){
      res.send({
        code: 500,
        data: {},
        msg: "密码错误",
      });
    }else{
      res.send({
        code: 300,
        data: {},
        msg: "成功",
      });
    }
  });
});
module.exports = router;
