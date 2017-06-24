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
    var imgPath = '/images/upload/' + req.file.filename;
    var desc = req.body.desc;

    db.execute('insert into Game values(null, ?, ?, ?)', [name, imgPath, desc], function(rows) {
        try {
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
});

router.get('/game', function(req, res) {
    db.execute('select * from Game', [], function(rows) {
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
    console.log(req.body);
    console.log(req.file);
    var id = req.body.id;
    var name = req.body.name;
    var imgPath = '/images/upload/' + req.file.filename;
    var desc = req.body.desc;

    // db.execute('update Game set name=?,imgPath=?,description=? where id=?', [name, imgPath, desc, id], function(rows) {
    //     try {
    //         res.json({ success: true });
    //     } catch (e) {
    //         res.json({ success: false });
    //     }
    // });
});

router.delete('/game/:id', function(req, res) {
    var id = req.params.id;

    db.execute('delete from Game where id=?', [id], function(rows) {
        try {
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
});

module.exports = router;