app.controller("ListingsController", function($scope){

  $scope.data = {
    results: [
      {
        address: "604 Arizona Ave. Santa Monica, CA",
        price: 10,
        availability: "Yes"
      },
      {
        address: "225 S. Olive St. Los Angeles, CA",
        price: 8,
        availability: "Yes"
      },
      {
        address: "123 1st Ave. Westwood, CA",
        price: 9,
        availability: "No"
      },
      {
        address: "1337 Maple St. Los Angeles, CA",
        price: 12,
        availability: "Yes"
      },
      {
        address: "888 Fortune Dr. Santa Monica, CA",
        price: 13,
        availability: "No"
      }
    ]
  };


});
