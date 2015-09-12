var mongoose = require('mongoose');

//keep Schema simple right now.
var userSchema = mongoose.Schema({
	username : String,
	password : String,
	email : String
}, { collection : 'users'});

module.exports = mongoose.model('User', userSchema);