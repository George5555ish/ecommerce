"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (err) {
  return console.log(err.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _userRoute["default"]);
app.use('/api/products', _productRoute["default"]);
app.use('/api/uploads', _uploadRoute["default"]);
app.use('/api/orders', _orderRoute["default"]);
app.use(_express["default"]["static"](__dirname + '/public'));
app.get('/api/config/paypal', function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
});
app.get('/api/products', function (req, res) {
  res.send(_data["default"].products);
}); // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/products/:id', function (req, res) {
  var productId = req.params.id;

  var product = _data["default"].products.find(function (x) {
    return x._id === productId;
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      msg: "Product Not Found."
    });
  }
});
app.listen('4000', function () {
  console.log('Server started on port 4000');
}); // "proxy": "http://127.0.0.1:4000",