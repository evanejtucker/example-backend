const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

require('./routes/products-api')(app);
require('./routes/users-api')(app);

app.get('/', (req, res, next)=> {
    res.sendFile('./index.html');
})

app.listen(port, (err)=> {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log(`app listening on port ${port}!`);
        mongoose.connect('mongodb://127.0.0.1:27017', function(error) {
            if(error) {
                console.log('the connection broke');
            } else {
                console.log('mongoose connection successful');
            }
        });
    }
});