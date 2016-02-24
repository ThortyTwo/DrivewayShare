app.controller("HomeController", function($scope, Listings, Auth, $location, $window) {
	
	$scope.user = {};
	$scope.data = {};
	$scope.search = "";
	$scope.expand = false;
	

	$scope.getSearch = function (searchInput) {
		Listings.getListings(searchInput)
		.then(function (searchResult) {
			$scope.data = searchResult;
			console.log($scope.data)
		});
		$scope.search = "";
	};

	$scope.toggleExpand = function() {
		$scope.expand = !$scope.expand;
	};

	$scope.signin = function () {
		Auth.signin($scope.user)
		.then(function (token) {
			$window.localStorage.setItem("authentication", token);
			$location.path("/user");
		})
		.catch(function (error) {
			console.error(error);
		});
	};
});