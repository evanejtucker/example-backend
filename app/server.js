const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./controller/passport')(passport);
require('./routes/products-api')(app);
require('./routes/users-api')(app, passport);

app.get('/', (req, res, next)=> {
    res.sendFile('./index.html');
});

app.get('/failure', (req, res, next)=> {
    res.send('failure');
});

app.listen(port, (err)=> {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log(`app listening on port ${port}!`);
        mongoose.connect('mongodb://localhost/login-v6', function(error) {
            if(error) {
                return console.log('the connection broke');
            } else {
                console.log('mongoose connection successful');
            }
        });
    }
});