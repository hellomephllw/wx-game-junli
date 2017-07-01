/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');

router.post('/gamebag', function(req, res) {
    console.log(req.body);
    console.log(req.file);
    res.end();
});




module.exports = router;