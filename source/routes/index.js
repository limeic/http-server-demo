// 处理首页信息

import express, {Router} from 'express';

let router = new Router();

// index默认路由
router.get('/', (req, res, next) => {
    res.render('index', {});
});

module.exports = router;
