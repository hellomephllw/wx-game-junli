/**
 * Created by liliwen on 2017/7/1.
 */
var express = require('express');
var router = express.Router();
var db = require('../utils/dbUtil');
var pagingUtil = require('../utils/pagingUtil');

router.get('/goodybag/index.htm', function(req, res) {
    var currentPage = req.query.currentPage;

    if (!currentPage || currentPage == null) currentPage = 1;

    var pagingObj = pagingUtil.receive(currentPage);

    db.execute('select * from GoodyBag limit ?,?', [pagingObj.firstRow, pagingObj.pageSize], function(rows) {
        var results = rows;
        db.execute('select count(*) count from GoodyBag', [], function(rows) {
            try {
                var count = rows[0].count;

                res.render('bg-goodybag/index', pagingUtil.give(results, count));
            } catch (e) {
                res.render('bg-goodybag/index', {});
            }
        });
    });
});

module.exports = router;