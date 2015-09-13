var userServiceModule = angular.module('userServiceModule', [])

userServiceModule.service('userService', function(){
    this.sayHello = function() {
        return "Hello, World!"
    };

    var userdata = {}

    this.setUserData =  function(data){
    	console.log(data)
    	this.userdata = data
    }

    this.getUserData = function(){
    	return userdata;
    }
})