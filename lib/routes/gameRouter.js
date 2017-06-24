/**
 * Created by liliwen on 2017/6/21.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');

router.get('/game/index.htm', function(req, res) {
    db.execute('select * from Game', [], function(rows) {
        try {
            res.render('bg-game/index', {
                rows: rows
            });
        } catch (e) {
            res.render('bg-game/index', {});
        }
    });
});

router.get('/game/new.htm', function(req, res) {
    res.render('bg-game/new', {});
});

module.exports = router;