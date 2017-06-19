/**
 * Created by liliwen on 2017/6/19.
 */
var express = require('express');
var router = express.Router();

router.all('/user', function(req, res) {
    res.json({
        name: 'zhangsan'
    });
});

module.exports = router;