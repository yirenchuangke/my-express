var express = require("express");
var router = express.Router();
var getIp = require("../utils/getIp");
const multer = require("multer");
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({
    success: true,
  });
});
// 文件上传
router.post(
  "/file",
  multer({
    dest: "upload",
  }).single("file"),
  (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, `upload/${req.file.originalname}`);
    req.file.url =
      "http://" + getIp + ":3000/static/image/" + req.file.originalname;
    res.send(req.file);
  }
);

router.post(
  "/files",
  multer({
    dest: "upload",
  }).array("files", 10),
  (req, res) => {
    const files = req.file;
    const fileList = {};
    for (var i in files) {
      var file = files[i];
      fs.renameSync(file.path, `upload/${file.originalname}`);
      file.path = `upload/${file.originalname}`;
      fileList.push(file);
    }
    fileList.push({ url: "http://127.0.0.1/3000" + file.originalname });
    res.send(fileList);
  }
);
// 下载
router.get("/download", (req, res) => {
  req.query.url
    ? res.download(`upload/${req.query.url}`)
    : res.send({
        success: false,
      });
});

module.exports = router;
