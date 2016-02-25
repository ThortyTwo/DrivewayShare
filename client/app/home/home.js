app.controller("HomeController", function($scope, Listings, Auth, $location, $window) {

	$scope.user = {};
	$scope.data = {};
	$scope.search = "";

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('main-search-input')),
    {types: ['geocode']});

  $scope.getSearch = function () {
    Listings.sendAddress(function(results) {
      Listings.getListings(results).then(function(searchResult) {
        $scope.data = searchResult;
        console.log(searchResult)
        $scope.search = "";
      });
    });
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
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
