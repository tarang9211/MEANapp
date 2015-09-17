module.exports = function(app, passport){


	var sess = {};
	var loginFlag =  false;

	function loggedIn(req, res, next){
		if (req.user){
			next();
		}
		else{
			console.log('else error');
		}
	}

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/success',
		failureRedirect: '/failure'
	}));

	app.get('/success', function (req, res){
		sess.username = req.user.username;
		sess.userid = req.user.id;
		sess.useremail = req.user.email;
		res.json({user : sess, loginFlag : true});
	})

	app.get('/failure', function (req, res){
		res.status(401).json({loginFlag : false});
	});

	//handles logging out the user
	app.get('/logout', function (req, res){
		req.logout();
		res.send('logout successful');
	})



};