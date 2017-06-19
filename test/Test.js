/**
 * Created by liliwen on 2017/6/16.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : 'test'
});

connection.connect();

connection.beginTransaction(function(err) {
    if (err) {
        console.log(err);
    }
    connection.query('update t_test set name=? where id=?', ['David', 2], function(err, rows, fields) {
        if (err) {
            connection.rollback(function() {
                console.log(err);
            });
        }

        connection.commit(function(err) {
            if (err) {
                connection.rollback(function() {
                    console.log(err);
                });
            }
            connection.end();

            console.log('The solution is: ', rows);
            console.log(rows.length);
        });
    });

});