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
	};

	$scope.signin = function () {
	  Auth.signin($scope.user)
	  .then(function (token) {
	    if(token === undefined){
	      alert("WRONG!!!!");
	    } else {
		  	$window.localStorage.setItem("authentication", token);
		  	$location.path("/user");
	    }
	  })
	  .catch(function (error) {
	    console.error(error);
	  });
	};

});
