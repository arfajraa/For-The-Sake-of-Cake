var express = require('express');
var app = express();
var port = 3000;
var session = require('./models/session');

// mustache config
var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/public'));

// body parser config
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// logger config 
var logger = require('morgan');
app.use(logger('dev'));

// method override config 
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
    var mustacheData = {
        session: req.session.user
    }
    res.render('./index', mustacheData);
})
app.get('/aboutus', (req, res) => {
    res.render('./aboutus');
})
app.get('/cart', (req, res) => {
    res.render('./cart');
})

var productController = require('./controllers/product_controller');
var userController = require('./controllers/user_controller');
var sessionController = require('./controllers/session_controller');

app.use('/products', productController);
app.use('/users', userController);
app.use('/login', sessionController);


app.listen(port, function () {
    console.log('---------------------------------------');
    console.log('Express listening on localhost:' + port);
    console.log('---------------------------------------');
})