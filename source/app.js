// 程序入口
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

let app = new express();

app.set('views', path.join(__dirname, "../views"));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// 设定路由
import Index from './routes/index';
app.use('/', Index);

// 404 handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误信息handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    // 记录错误信息，跳转到页面
    console.error(err);
    let errmsg = { // 默认为5xx异常
        code: err.status,
        title: '服务器异常',
        content: '服务器发生异常，请联系管理员',
    };
    if ( err.status === 403 ) {
        errmsg.code = 403;
        errmsg.title = '访问拒绝';
        errmsg.content = '您没有权限访问该页面，请联系管理员';
    } else if ( err.status === 404 ) {
        errmsg.code = 404;
        errmsg.title = '找不到页面';
        errmsg.content = '您访问的页面不存在，请联系管理员';
    }
    res.render('error.ejs', {err: errmsg});
});

module.exports = app;
