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

        $scope.data.sort(function(itemA, itemB) {
          return itemA.dist - itemB.dist;
        });
        
        $scope.listPopulated = true;
        $scope.search = "";
      });
    });
  };

  $scope.sendEmail = function(email){
    var mail = 'mailto:' + email;
    window.location.href = mail;
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
  };

  $scope.sortDist = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.dist - itemB.dist;
    });
  };

  $scope.sortPrice = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.listing.price - itemB.listing.price;
    });
  };

});
