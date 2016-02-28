app.controller("HomeController", function($scope, Listings) {

	$scope.data = [];
	$scope.search = "";
  var prevSearch = $scope.search;
  $scope.distSearchInput = 2;
  $scope.listPopulated = false;

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("main-search-input")),
    {types: ["geocode"]});

  var handleSearchResults = function(searchResult) {
    $scope.data = _.filter(searchResult, function(listing) {
      return listing.listing.available !== 0;
    });

    $scope.data.sort(function(itemA, itemB) {
      return itemA.dist - itemB.dist;
    });
    
    $scope.listPopulated = true;
    $scope.search = "";
  }

  $scope.getSearch = function() {
    Listings.sendAddress("main-search-input", function(results) {
      prevSearch = results;
      Listings.getListings(results, $scope.distSearchInput).then(function(searchResult) {
        handleSearchResults(searchResult);
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

  $scope.$watch("distSearchInput", _.throttle(function(){
    if($scope.listPopulated) {
      Listings.getListings(prevSearch, $scope.distSearchInput).then(function(searchResult) {
        handleSearchResults(searchResult);
      });
    }
  }, 800, {"leading": true, "trailing": true}));

});
