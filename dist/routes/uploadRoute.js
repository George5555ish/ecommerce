"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), ".jpg"));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});

var router = _express["default"].Router();

router.post('/', upload.single('image'), function (req, res) {
  res.send("/".concat(req.file.path));
});
var _default = router;
exports["default"] = _default;