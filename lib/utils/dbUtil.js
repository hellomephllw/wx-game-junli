/**
 * Created by liliwen on 2017/6/21.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Lulu010203',
    database: 'coolguy'
});

connection.connect();

module.exports = {
    execute: function(sql, params, callback) {
        //打开事务
        connection.beginTransaction(function(err) {
            if (err) {
                console.warn(err);
            }
            //执行sql
            connection.query(sql, params, function(err, rows, fields) {
                if (err) {
                    connection.rollback(function() {
                        console.warn(err);
                    });
                }

                //提交事务
                connection.commit(function(err) {
                    if (err) {
                        connection.rollback(function() {
                            console.warn(err);
                        });
                    }
                    // //关闭链接
                    // connection.end();

                    //回调
                    callback(rows);
                });
            });
        });
    },
    conn: connection
};