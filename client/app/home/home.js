app.controller("HomeController", function($scope, Listings) {
	
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

});