/**
 * Created by liliwen on 2017/6/21.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');
var pagingUtil = require('../utils/pagingUtil');

router.get('/game/index.htm', function(req, res) {
    var currentPage = req.query.currentPage;

    if (!currentPage || currentPage == null) currentPage = 1;

    var pagingObj = pagingUtil.receive(currentPage);

    db.execute('select * from Game limit ?,?', [pagingObj.firstRow, pagingObj.pageSize], function(rows) {
        var results = rows;
        db.execute('select count(*) count from Game', [], function(rows) {
            try {
                var count = rows[0].count;

                res.render('bg-game/index', pagingUtil.give(results, count));
            } catch (e) {
                res.render('bg-game/index', {});
            }
        });
    });
});

router.get('/game/new.htm', function(req, res) {
    res.render('bg-game/new', {});
});

router.get('/game/detail.htm', function(req, res) {
    var id = req.query.id;

    db.execute('select * from Game where id=?', [id], function(rows) {
        try {
            res.render('bg-game/detail', rows[0]);
        } catch (e) {
            res.render('bg-game/detail', {});
        }
    });
});

router.get('/game/modify.htm', function(req, res) {
    var id = req.query.id;

    db.execute('select * from Game where id=?', [id], function(rows) {
        try {
            res.render('bg-game/modify', rows[0]);
        } catch (e) {
            res.render('bg-game/modify', {});
        }
    });
});

router.get('/game/wx/index.htm', function(req, res) {
    res.render('wx-goodybag/index');
});

module.exports = router;