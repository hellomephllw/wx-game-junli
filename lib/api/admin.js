/**
 * Created by liliwen on 2017/6/19.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');

router.all('/user', function(req, res) {
    res.json({
        name: 'zhangsan'
    });
});

router.post('/admin/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.execute('select * from Admin where username=? and password=?', [username, password], function(rows) {
        try {
            var success = false;

            if (rows.length > 0) success = true;

            res.json({success: success});
        } catch (e) {
            console.error(e);
        }
    });
});

module.exports = router;