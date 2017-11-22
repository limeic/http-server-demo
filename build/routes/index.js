'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

// index默认路由
// 处理首页信息

router.get('/', function (req, res, next) {
    res.render('index', {});
});

module.exports = router;