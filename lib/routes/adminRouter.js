/**
 * Created by liliwen on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/admin/login.htm', function(req, res) {
    res.render('bg-login/index', {

    });
});

module.exports = router;