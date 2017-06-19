/**
 * Created by liliwen on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/admin/test.htm', function(req, res) {
    res.render('bg-admin/test', {

    });
});

module.exports = router;