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

  $scope.createListing = function(){

    // parse through formatted_address or google place object
    // to fill in individual fields in $scope.newListing

    // send object to be posted
    Listings.postListing($scope.newListing)
    .then(function(data) {
      console.log("New listing created (but not actually)")
    });

    resetNewListing();
  };


});
