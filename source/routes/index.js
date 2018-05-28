// 处理首页信息

import express, {Router} from 'express';
import Request from 'request';
import { log } from 'util';

let router = new Router();

// index默认路由
router.get('/', (req, res, next) => {
    res.render('index', {});
});

// ping Get测试
router.get('/ping', (req, res, next) => {
    let data = req.query.data;
    console.log("recevied ping data: ", data);
    res.send(data);
    res.end();
});

// ping Post测试
router.post('/ping', (req, res, next) => {
    let data = req.body;
    console.log("received ping data: ", data);
    res.send(data);
    res.end();
});

// broadcast 测试
router.post('/broadcast', (req, res, next) => {
    let data = req.body;
    console.log("received broadcast data: ", data);

    let resp = {
        "code": 200,
        "msg": "success"
    };

    if ( !data.appId ) {
        console.error("no appId exists in body: ", data.appId);
        resp.code = 500;
        resp.msg = "no appId exists!";
        res.send(resp);
        return ;
    }

    // 判断userId是否存在
    if ( !data.toUserIdList ) {
        console.error("no toUserIdList exists in body: ", data.userId);
        resp.code = 500;
        resp.msg = "no userId exists!";
        res.send(resp);
        return ;
    }

    // 判断data是否存在
    if ( !data.data ) {
        console.error("no data exists in body: ", data.data);
        resp.code = 500;
        resp.msg = "no data exists!";
        res.send(resp);
        return ;
    }

    // 通知到gateway broadcast server
    let broadcastUrl = data.gatewayDomain + "/api/data/broadcast";
    console.log("broadcastUrl: ", broadcastUrl);
    let param = {
        appKey: data.appId,
        toUserIdList: data.toUserIdList,
        data: JSON.stringify(data.data),
    };
    console.log("send param: ", param);
    Request({
        url: broadcastUrl,
        method: "POST",
        json: param
    }, (err, resp, body) => {
        if ( !!err ) {
            console.log("broadcast err: ", err);
            return ;
        }    
        console.log("broadcast resp body: ", body);
    });

    res.send(resp);
    res.end();
});

module.exports = router;
