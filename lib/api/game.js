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

    console.log(name, imgPath, desc);

    res.end();
});





module.exports = router;