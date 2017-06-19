/**
 * Created by liliwen on 2017/6/16.
 */
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

/**启动服务器*/
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('CoolMan app listening at http://%s:%s', host, port);
});

/**指定静态目录*/
app.use(express.static('./web/public'));

/**配置handlebar视图*/
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', './web/views');

/**添加路由*/
//api
app.use('/api', require('./lib/api/admin'));

//视图
app.use('/', require('./lib/routes/adminRouter'));