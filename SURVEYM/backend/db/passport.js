
//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const Jwtstrategy = require('passport-jwt').Strategy;
const User = require('../backend/db/models/user.model');
const config = require('./db/mongoose');


module.exports = function(){
    let opts = {};
    opts.jwtFromrequest = Extractjwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new Jwtstrategy(opts, (jwt_payload, done) => {
        User.getUserbyId(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }))
}

passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function(username, password, done){
        User.findOne({email: username}, function(err, user){
            if(err) { return done(err);}
            if(!user){
                return done(null, false, {message: 'Incorrect username. '});
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Incorrect password. '});
            }
            return done(null, false);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, false);
    })
})