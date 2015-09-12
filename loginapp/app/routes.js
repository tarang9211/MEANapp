module.exports = function(app, passport){


	var sess = {}
	var loginFlag =  false

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/success',
		failureRedirect: '/failure'
	}))

	app.get('/success', function (req, res){
		sess.username = req.user.username
		sess.userid = req.user.id
		sess.useremail = req.user.email
		res.json({user : sess, loginFlag : true})
	})

	app.get('/failure', function (req, res){
		res.status(401).json({loginFlag : false})
	})

	// app.get('/', function (req, res){
	// 	res.sendFile('index.html');
	// });

};