/**
 * Created by liliwen on 2017/6/21.
 */
var express = require('express');
var router = express.Router();

router.get('/game/index.htm', function(req, res) {
    res.render('bg-game/index', {});
});

module.exports = router;