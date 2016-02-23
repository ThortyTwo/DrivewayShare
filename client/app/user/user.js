app.controller("UserController", function($scope, Listings){

  $scope.newListing = {
    street_address: "",
    city_name: "",
    zip_code: "",
    start_time: "",
    end_time: "",
    avail_days: [],
    price: ""
  },

  $scope.createListing = function(){
    console.log("click successful");
    Listings.postListing({})
    .then(function(data) {
      console.log("made it back to controller", data);
    });
  }

});
