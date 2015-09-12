
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport){

	//serializing and deserializing
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	//local-login
	passport.use('local-login', new LocalStrategy ({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	},
	function (req, username, password, done){
			User.findOne({'username' : username, 'password' :  password}, function (err, user) {
				if (err)
					return done(err);

				if (!user)
					return done(null, false);

				return done(null, user);
				
			});
	}));


	

};