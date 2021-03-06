/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../utils/dbUtil');
var multer  = require('multer');
var upload = multer({ dest: rootPath + '/web/public/images/upload/text' });

router.post('/goodybag', upload.single('redeemkey'), function(req, res) {
    var gameId = req.body.gameid;
    var name = req.body.name;
    var desc = req.body.desc;
    var file = req.file;

    try {
        var content, codes, sql, params;
        if (file) {
            //读取文件内容
            content = fs.readFileSync(req.file.path, 'utf8');
            codes = content.split('\n');

            //删除文件
            fs.unlinkSync(req.file.path);

            db.execute('insert into GoodyBag values(null, ?, ?, ?)', [name, desc, gameId], function(rows) {
                try {
                    //礼包id
                    var goodyBagId = rows.insertId;

                    //初始化sql
                    sql = 'insert into RedeemKey values';
                    //初始化参数
                    params = [];

                    codes.forEach(function(ele, i) {
                        if (i == 0) {
                            sql += '(null, ?, ?, ?, ?)';
                        } else {
                            sql += ' ,(null, ?, ?, ?, ?)';
                        }
                        params = params.concat([ele, 0, 0, goodyBagId]);
                    });

                    //执行sql
                    db.execute(sql, params, function() {
                        res.end();
                    });
                } catch (e) {
                    console.error(e);
                    res.end();
                }
            });

        } else {
            db.execute('insert into GoodyBag values(null, ?, ?, ?)', [name, desc, gameId], function() {
                res.end();
            });
        }
    } catch (e) {
        console.error(e);
        res.end();
    }
});

router.get('/goodybag/:gameId', function(req, res) {
    var gameId = req.params.gameId;

    db.execute('select * from GoodyBag where gameid=?', [gameId], function(rows) {
        res.json({
            success: true,
            result: rows[0]
        });
    });
});

router.get('/goodybag/:goodyBagId/count', function(req, res) {
    var goodyBagId = req.params.goodyBagId;

    db.execute('select count(*) as count from RedeemKey where goodybagid=?', [goodyBagId], function(rows) {
        var total = rows[0].count;

        db.execute('select count(*) as count from RedeemKey where goodybagid=? and isObtained=?', [goodyBagId, 1], function(rows) {
            var obtained = rows[0].count;

            res.json({
                success: true,
                total: total,
                obtained: obtained
            });
        });
    });
});

router.get('/goodybag/:goodBagId/redeemkey/one', function(req, res) {
    //获取礼包id
    var goodBagId = req.params.goodBagId;

    //打开事务
    db.conn.beginTransaction(function(err) {
        //报错提示
        if (err) console.warn(err);
        //执行获取一个兑换码的sql
        var getAllRedeemKeySql = 'select id,code from RedeemKey where isLocked=0 and isObtained=0 and goodybagid=? limit 1 for update';
        db.conn.query(getAllRedeemKeySql, [goodBagId], function(err, rows, fields) {
            //报错滚回
            if (err) db.conn.rollback(function() {console.warn(err)});

            if (rows.length === 0) {//剩余兑换码为0
                //提交事务
                db.conn.commit(function(err) {
                    if (err) db.conn.rollback(function() {console.warn(err)});
                });
                //返回响应
                res.json({
                    success: false,
                    msg: '没有更多兑换码！'
                });
            } else {//还有剩余兑换码
                var redeemKey = rows[0];

                //更新被获取的兑换码状态
                db.conn.query('update RedeemKey set isLocked=1,isObtained=1 where id=?', [redeemKey.id], function(err, rows, fields) {
                    //报错滚回
                    if (err) db.conn.rollback(function() {console.warn(err)});
                    //提交事务
                    db.conn.commit(function(err) {
                        if (err) db.conn.rollback(function() {console.warn(err)});
                    });
                    //返回响应
                    res.json({
                        success: true,
                        code: redeemKey.code
                    });
                });
            }
        });
    });
});

router.delete('/goodybag/:goodyBagId', function(req, res) {
    var goodyBagId = req.params.goodyBagId;

    db.execute('delete from GoodyBag where id=?', [goodyBagId], function() {
        db.execute('delete from RedeemKey where goodybagid=?', [goodyBagId], function() {
            try {
                res.json({ success: true });
            } catch (e) {
                res.json({ success: false });
            }
        });
    });
});

router.patch('/goodybag', upload.single('redeemkey'), function(req, res) {
    var goodyBagId = req.body.goodybagid;
    var name = req.body.name;
    var desc = req.body.desc;
    var file = req.file;

    try {
        var content, codes, sql, params;
        if (file) {
            //读取文件内容
            content = fs.readFileSync(req.file.path, 'utf8');
            codes = content.split('\n');

            //删除文件
            fs.unlinkSync(req.file.path);

            db.execute('update GoodyBag set name=?, description=? where id=?', [name, desc, goodyBagId], function(rows) {
                try {
                    //初始化sql
                    sql = 'insert into RedeemKey values';
                    //初始化参数
                    params = [];

                    codes.forEach(function(ele, i) {
                        if (i == 0) {
                            sql += '(null, ?, ?, ?, ?)';
                        } else {
                            sql += ' ,(null, ?, ?, ?, ?)';
                        }
                        params = params.concat([ele, 0, 0, goodyBagId]);
                    });

                    //执行sql
                    db.execute(sql, params, function() {
                        res.end();
                    });
                } catch (e) {
                    console.error(e);
                    res.end();
                }
            });

        } else {
            db.execute('update GoodyBag set name=?, description=? where id=?', [name, desc, goodyBagId], function() {
                res.end();
            });
        }
    } catch (e) {
        console.error(e);
        res.end();
    }
});

module.exports = router;

