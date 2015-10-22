var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./server/routes.js'),
    exphbs = require('express3-handlebars'),
    lessMiddleware = require('less-middleware'),
    mongoose = require('mongoose'),
    seeder = require('./server/storage/seeder.js'),
    app = express();

app.set('port', process.env.PORT || 3300);

app.set('views', __dirname + '/client/templates');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views')
}));
app.set('view engine', 'handlebars');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use(app.router);


app.use('/', lessMiddleware('/css', { //Compilation of LESS files
    pathRoot: path.join(__dirname, 'public'),
    dest: '/css/compiled',
    force: true
}));
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'client')))

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//connect to the db server:
mongoose.connect('mongodb://test:test@ds041821.mongolab.com:41821/heroku_app33779732');
//mongodb://localhost/server/data/db
mongoose.connection.on('open', function() {
    console.log("Connected to Mongoose...");

    // check if the db is empty, if so seed it with some contacts:
   seeder.check();
});

//routes list:
routes.initialize(app);

//finally boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
