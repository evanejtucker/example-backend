require('../models/users');

module.exports = (app, passport)=> {

    app.get('/api/user/profile', isLoggedIn, (req, res, next)=> {
        console.log('logged in successfully');
        res.send(req.user);
    });

    app.get('/api/user/logout', logoutUser, (req, res, next)=> {
        res.send('logged out successfully');
    });

    app.post('/api/user/login', passport.authenticate('local-login', {
        successRedirect : '/api/user/profile', 
        failureRedirect : '/failure',
        failureFlash : true
    }));

    app.post('/api/user/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/user/profile', 
        failureRedirect : '/failure', 
        failureFlash : true 
    }));

}