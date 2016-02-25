app.controller("HomeController", function($scope, Listings) {

	$scope.data = {};
	$scope.search = "";
  $scope.listPopulated = false;

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("main-search-input")),
    {types: ["geocode"]});

  $scope.getSearch = function() {
    Listings.sendAddress("main-search-input", function(results) {
      Listings.getListings(results).then(function(searchResult) {
        $scope.data = searchResult;
        $scope.listPopulated = true;
        console.log(searchResult)
        $scope.search = "";
      });
    });
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
  };

});
