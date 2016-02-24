app.controller("UserController", function($scope, Listings){

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
    (document.getElementById('post-address-input')),
    {types: ['geocode']});

  $scope.createListing = function(){

    // parse through formatted_address or google place object
    // to fill in individual fields in $scope.newListing

    // send object to be posted
    $scope.getSearch = function () {
      Listings.sendAddress(function(results) {
        console.log("in callback, result is", results)
        Listings.postListing(results).then(function(searchResult) {
          $scope.data = searchResult;
          resetNewListing();
        });
      });
    };
  };


});
