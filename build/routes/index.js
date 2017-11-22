'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 处理首页信息

var router = new _express.Router();

// index默认路由
router.get('/', function (req, res, next) {
    res.render('index', {});
});

// ping Get测试
router.get('/ping', function (req, res, next) {
    var data = req.query.data;
    console.log("recevied ping data: ", data);
    res.send(data);
    res.end();
});

// ping Post测试
router.post('/ping', function (req, res, next) {
    var data = req.body;
    console.log("received ping data: ", data);
    res.send(data);
    res.end();
});

// broadcast 测试
router.post('/broadcast', function (req, res, next) {
    var data = req.body;
    console.log("received broadcast data: ", data);

    var resp = {
        "code": 200,
        "msg": "success"
    };

    // 判断userId是否存在
    if (!data.userId) {
        console.error("no userId exists in body: ", data.userId);
        resp.code = 500;
        resp.msg = "no userId exists!";
        res.send(resp);
        return;
    }

    // 判断data是否存在
    if (!data.data) {
        console.error("no data exists in body: ", data.data);
        resp.code = 500;
        resp.msg = "no data exists!";
        res.send(resp);
        return;
    }

    //TODO: 通知到gateway broadcast server

    res.send(resp);
    res.end();
});

module.exports = router;