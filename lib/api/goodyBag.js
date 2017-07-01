/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');
var multer  = require('multer');

router.post('/game', upload.single('background'), function(req, res) {
    var name = req.body.name;
    var imgPath = '/images/upload/' + req.file.filename;
    var desc = req.body.desc;

    db.execute('insert into Game values(null, ?, ?, ?)', [name, imgPath, desc], function() {
        try {
            res.json({ success: true });
        } catch (e) {
            res.json({ success: false });
        }
    });
});




module.exports = router;