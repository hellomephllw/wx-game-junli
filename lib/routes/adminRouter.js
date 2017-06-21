/**
 * Created by liliwen on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/admin/login.htm', function(req, res) {
    res.render('bg-login/index', {});
});

router.get('/admin/index.htm', function(req, res) {
    res.render('layouts/bg-index', {});
});

router.get('/admin/homepage.htm', function(req, res) {
    res.render('bg-homepage/index', {});
});

module.exports = router;