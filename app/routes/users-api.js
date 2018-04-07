require('../models/users');
const userController = require('../controller/userController');

module.exports = (app, passport)=> {

    app.get('/api/users/profile', isLoggedIn, (req, res, next)=> {
        console.log('logged in successfully');
        res.send(req.user);
    });

    app.get('/api/users/logout', logoutUser, (req, res, next)=> {
        res.send('logged out successfully');
    });

    app.post('/api/users/login', passport.authenticate('local-login', {
        successRedirect : '/api/users/profile', 
        failureRedirect : '/failure',
        failureFlash : true
    }));

    app.post('/api/users/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/users/profile', 
        failureRedirect : '/failure', 
        failureFlash : true 
    }));

    app.get('/api/users/all', (req, res, next)=> {
        userController.findAll(req, res);
    });

    app.get('/api/users/user/:user', (req, res, next)=> {
        userController.findOne(req, res);
    });

    app.get('/api/users/remove/:user', (req, res, next)=> {
        userController.removeOne(req, res);
        res.send('user was successfully removed');
    });

}