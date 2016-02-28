app.controller("UserController", function($scope, $window, Listings){

  $scope.data = {};

  $scope.tab = 1;

  var resetNewListing = function() {
    $scope.newListing = {
      formatted_address: "",
      street_address: "",
      city_name: "",
      zip_code: "",
      start_time: "",
      end_time: "",
      avail_days: [],
      price: ""
    }
  };

  resetNewListing();

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("post-address-input")),
    {types: ["geocode"]});


  $scope.setTab = function(tab) {
    $scope.tab = tab;
  };

  $scope.isSet = function(tab) {
    return $scope.tab === tab;
  };


  $scope.createListing = function() {
    // send object to be posted
    Listings.sendAddress("post-address-input", function(results) {
      results.price = $scope.newListing.price;
      Listings.postListing(results).then(function(respdata) {
        resetNewListing();
        getCurrentListings();
      });
    });
  };

  $scope.removeListing = function(item) {
    var index = $scope.data.indexOf(item);
    var id = $scope.data[index].id;

    $scope.data.splice(index, 1);
    Listings.deleteListing(id);
  };

  $scope.toggleListingAvailability = function(item) {
    var index = $scope.data.indexOf(item);
    var id = $scope.data[index].id;
    //Convert true/false value back to 1/0 for storage in db
    var avail = $scope.data[index].available ? 1 : 0;

    Listings.toggleListingAvailability(id, avail);
  };

  var getCurrentListings = function() {
    Listings.getUserListings().then(function(searchResult) {
      $scope.data = searchResult;
    })
  }

  getCurrentListings();
});
