app.controller("NavController", function($scope, Auth, $location, $window) {

  $scope.user = {};

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
