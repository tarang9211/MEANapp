var app = angular.module('app', ['ui.router','userServiceModule']);


app.config(function ($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url : '/login',
		templateUrl : 'login.html',
		controller : function ($scope, $http, $state, userService){

			//login functionality.
			$scope.login = function(){
				if ($scope.formdata.username != "" && $scope.formdata.password != "")
				{
					$http.post('/login', $scope.formdata)
					.success(function (data){
						
						if (data.loginFlag){
							console.log(data);
							userService.setUserData(data.user);
							$state.go('main')
						}
					})
					.error(function (data){
						console.log("Error", data)
					});
				} else {

				}
			}

			//changing state to signup
			$scope.goToSignUp = function(){
				$state.go('signup')
			}
		}
	})

	.state('signup',{
		url: '/signup',
		templateUrl: 'signup.html',
		controller: function ($scope, $http, $state){

			//changing state to login
			$scope.goBackToSign = function(){
				$state.go('login')
			}
		}
	})

	.state('main',{
		url: '/main',
		templateUrl: 'main.html',
		controller: function ($scope, $http, $state, userService){

			$scope.user = userService.getUserData()

		}
	})

	.state('main.profile', {
		url: '/profile',
		templateUrl: 'main.profile.html',
		controller: function($scope){
			
		}
	})


});



