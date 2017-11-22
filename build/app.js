'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default(); // 程序入口


app.set('views', _path2.default.join(__dirname, "../views"));
app.set('view engine', 'ejs');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, "../public")));

// 设定路由

app.use('/', _index2.default);

// 404 handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误信息handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    // 记录错误信息，跳转到页面
    console.error(err);
    var errmsg = { // 默认为5xx异常
        code: err.status,
        title: '服务器异常',
        content: '服务器发生异常，请联系管理员'
    };
    if (err.status === 403) {
        errmsg.code = 403;
        errmsg.title = '访问拒绝';
        errmsg.content = '您没有权限访问该页面，请联系管理员';
    } else if (err.status === 404) {
        errmsg.code = 404;
        errmsg.title = '找不到页面';
        errmsg.content = '您访问的页面不存在，请联系管理员';
    }
    res.render('error.ejs', { err: errmsg });
});

module.exports = app;