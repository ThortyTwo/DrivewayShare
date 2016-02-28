app.controller("NavController", function($scope, Auth, Nav, $location, $window) {

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

  $scope.setPage = function(val){
    Nav.setPage(val);
  }

  $scope.isSet = function(page) {
    return Nav.getPage() === page;
  };

  $scope.signout = function() {
    Nav.setPage(1);
    Auth.signout();
  };

  $scope.isSignedIn = function() {
    return Auth.isSignedIn();
  };

});
