/**
 * Created by liliwen on 2017/6/16.
 */
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
global.rootPath = __dirname;

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

/**解析application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: false }));
/**解析application/json*/
app.use(bodyParser.json());

/**添加路由*/
//api
app.use('/coolguy/api', require('./lib/api/admin'));
app.use('/coolguy/api', require('./lib/api/game'));
app.use('/coolguy/api', require('./lib/api/goodyBag'));

//视图
app.use('/coolguy', require('./lib/routes/adminRouter'));
app.use('/coolguy', require('./lib/routes/gameRouter'));
app.use('/coolguy', require('./lib/routes/goodyBagRouter'));