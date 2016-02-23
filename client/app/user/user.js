app.controller("UserController", function($scope){

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
  }

});
