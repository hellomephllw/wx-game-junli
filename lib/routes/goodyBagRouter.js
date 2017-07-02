/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');
var pagingUtil = require('../utils/pagingUtil');

router.get('/goodybag/index.htm', function(req, res) {
    var gameId = req.query.gameid;
    var currentPage = req.query.currentPage;

    if (!currentPage || currentPage == null) currentPage = 1;

    var pagingObj = pagingUtil.receive(currentPage);

    db.execute('select * from GoodyBag where gameid=? limit ?,?', [gameId, pagingObj.firstRow, pagingObj.pageSize], function(rows) {
        var results = rows;
        db.execute('select count(*) count from GoodyBag', [], function(rows) {
            try {
                var count = rows[0].count;

                var result = pagingUtil.give(results, count);
                result.gameId = gameId;
                res.render('bg-goodybag/index', result);
            } catch (e) {
                res.render('bg-goodybag/index', {});
            }
        });
    });
});

router.get('/goodybag/new.htm', function(req, res) {
    var gameId = req.query.gameid;
    res.render('bg-goodybag/new', {gameId: gameId});
});

router.get('/goodybag/detail.htm', function(req, res) {
    var goodyBagId = req.query.goodybagid;
    var gameId = req.query.gameid;

    db.execute('select * from GoodyBag where id=?', [goodyBagId], function(rows) {
        try {
            var result = rows[0];
            result.gameId = gameId;
            result.goodyBagId = goodyBagId;
            res.render('bg-goodybag/detail', rows[0]);
        } catch (e) {
            res.render('bg-goodybag/detail', {});
        }
    });
});

router.get('/goodybag/modify.htm', function(req, res) {
    var goodyBagId = req.query.goodybagid;
    var gameId = req.query.gameid;

    db.execute('select * from GoodyBag where id=?', [goodyBagId], function(rows) {
        try {
            var result = rows[0];
            result.gameId = gameId;
            res.render('bg-goodybag/modify', rows[0]);
        } catch (e) {
            res.render('bg-goodybag/modify', {});
        }
    });
});

module.exports = router;