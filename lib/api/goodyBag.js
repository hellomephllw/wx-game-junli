/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../utils/dbUtil');
var multer  = require('multer');
var upload = multer({ dest: rootPath + '/web/public/images/upload/text' });

router.post('/goodybag', upload.single('redeemcode'), function(req, res) {
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

router.get('/goodybag/:goodyBagId/count', function(req, res) {
    var goodyBagId = req.params.goodyBagId;

    db.execute('select count(*) as count from RedeemKey where goodybagid=?', [goodyBagId], function(rows) {
        var total = rows[0].count;

        db.execute('select count(*) as count from RedeemKey where goodybagid=? isObtained=?', [goodyBagId, 1], function(rows) {
            var obtained = rows[0].count;

            res.json({
                success: true,
                total: total,
                obtained: obtained
            });
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

router.patch('/goodybag', upload.single('redeemcode'), function(req, res) {

});

module.exports = router;