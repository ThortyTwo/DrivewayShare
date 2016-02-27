app.controller("HomeController", function($scope, Listings) {

	$scope.data = [];
	$scope.search = "";
  $scope.listPopulated = false;

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("main-search-input")),
    {types: ["geocode"]});

  $scope.getSearch = function() {
    Listings.sendAddress("main-search-input", function(results) {
      Listings.getListings(results).then(function(searchResult) {
        $scope.data = _.filter(searchResult, function(listing) {
					return listing.listing.available !== 0;
				});
        $scope.data.sort(function(a, b) {
          return a.dist - b.dist;
        });
        $scope.listPopulated = true;
        $scope.search = "";
      });
    });
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
  };

});
