// 处理首页信息

import express, {Router} from 'express';
import Request from 'request';
import { log } from 'util';
import { BADRESP } from 'dns';

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

    if ( !data.appKey ) {
        console.error("no appId exists in body: ", data.appKey);
        resp.code = 500;
        resp.msg = "no appId exists!";
        res.send(resp);
        return ;
    }

    // 判断userId是否存在
    if ( !data.userIds ) {
        console.error("no userIds exists in body: ", data.userIds);
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

    //  从Lemon RESTful API中获取appId对应的domain列表。每个domain列表都需要发送请求
    // 测试地址
    Request({
        url: "https://api.limeic.com/rest/connectors/http",
        method: "POST",
        json: {
            appKey: data.appKey,
            userIds: data.userIds,
        }
    }, (err, resp, body) => {

        if ( !!err ) {
            console.log("fetch connectors err: ", err);
            return ;
        }

        const content = resp.body;
        if ( content.status != "ok" ) {
            console.log("fetch connectors failed. resp: ", content);
            return ;
        }
    
        // 发送广播请求
        content.connectors.forEach(connector => {            
            Request({
                url: "http://" + connector.domain + "/api/data/broadcast",
                method: "POST",
                json: data
            }, (err, resp, body) => {
                if ( !!err ) {
                    console.log("broadcast err: ", err);
                    return ;
                }    
                console.log("broadcast resp body: ", body);
            });
        });

    });

    res.send(resp);
    res.end();
});

module.exports = router;
