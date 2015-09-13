var userServiceModule = angular.module('userServiceModule', [])

userServiceModule.service('userService', function(){

    var userdata = {}

    this.setUserData =  function(data){
    	userdata = data
    }

    this.getUserData = function(){
    	return userdata
    }


})