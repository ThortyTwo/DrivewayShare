app.controller("SignupController", function($scope, Auth, Nav, $location, $window){

	$scope.user = {};

  Nav.setPage(4);

	$scope.signup = function() {
		Auth.signup($scope.user)
		.then(function (token){
			$window.localStorage.setItem("authentication", token);
			$location.path("/user");
      Nav.setPage(3);
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
        Nav.setPage(3);
	    }
	  })
	  .catch(function (error) {
	    console.error(error);
	  });
	};

});
