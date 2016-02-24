app.controller("HomeController", function($scope, Listings) {

  $scope.data = {};
  $scope.search = "";
  $scope.expand = false;

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('main-search-input')),
    {types: ['geocode']});

  $scope.getSearch = function () {
    Listings.sendAddress(function(results) {
      console.log("in callback, result is", results)
      Listings.getListings(results).then(function(searchResult) {
        $scope.data = searchResult;
      });
    });
    $scope.search = "";
  };

  $scope.toggleExpand = function() {
    $scope.expand = !$scope.expand;
  };

});
