/**
 * Created by liliwen on 2017/6/21.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootPath + '/web/public/images/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});
var upload = multer({ storage: storage });

router.post('/game', upload.single('background'), function(req, res) {
    var name = req.body.name;
    var imgPath = req.file ? '/coolguy/images/upload/' + req.file.filename : false;
    var desc = req.body.desc;
    var rankNo = req.body.rank;

    var sql = '';
    var params = [];
    if (imgPath) {
        sql = 'insert into Game values(null, ?, ?, ?, ?)';
        params = [name, imgPath, desc, rankNo];
    } else {
        sql = 'insert into Game values(null, ?, ?, ?, ?)';
        params = [name, '/coolguy/images/bg/empty.jpg', desc, rankNo];
    }

    db.execute(sql, params, function() {
        try {
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
});

router.get('/game', function(req, res) {
    db.execute('select * from Game order by rankNo', [], function(rows) {
        try {
            res.json({
                success: true,
                data: rows
            });
        } catch (e) {
            res.json({ success: false });
        }
    });
});

router.patch('/game', upload.single('background'), function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var imgPath = req.file ? '/coolguy/images/upload/' + req.file.filename : false;
    var desc = req.body.desc;
    var rankNo = req.body.rank;

    var sql = '';
    var params = [];
    if (imgPath) {
        sql = 'update Game set name=?,imgPath=?,description=?,rankNo=? where id=?';
        params = [name, imgPath, desc, rankNo, id];
    } else {
        sql = 'update Game set name=?,description=?,rankNo=? where id=?';
        params = [name, desc, rankNo, id];
    }

    db.execute('update Game set rankNo=? where rankNo=?', [999, rankNo], function() {
        db.execute(sql, params, function() {
            try {
                res.json({ success: true });
            } catch (e) {
                res.json({ success: false });
            }
        });
    });
});

router.delete('/game/:id', function(req, res) {
    var id = req.params.id;

    db.execute('delete from Game where id=?', [id], function() {
        try {
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
});

module.exports = router;