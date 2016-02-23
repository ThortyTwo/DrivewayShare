app.controller("HomeController", function($scope, Listings) {
	
	$scope.data = {};
	$scope.search = "";
	
	$scope.getSearch = function (searchInput) {
		Listings.getListings(searchInput)
		.then(function (searchResult) {
			$scope.data = searchResult;
			console.log($scope.data)
		});
		$scope.search = "";
	  	
	}
});