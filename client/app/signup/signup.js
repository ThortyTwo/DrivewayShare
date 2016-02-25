app.controller("SignupController", function($scope, Auth, $location, $window){

	$scope.user = {};

	$scope.signup = function() {
		Auth.signup($scope.user)
		.then(function (token){
			$window.localStorage.setItem("authentication", token);
			$location.path("/user");
		})
		.catch(function(error) {
			console.error(error);
		})
	}
})
