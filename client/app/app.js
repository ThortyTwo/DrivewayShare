var app = angular.module("Driveway-Share", [
	"ui.router",
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){

	$stateProvider
		.state("home", {
			url: "/home",
			templateUrl: "app/home/home.html",
			controller: "HomeController",
			authenticate: false
		})
		.state("signup", {
			url: "/signup",
			templateUrl: "app/signup/signup.html",
			controller: "SignupController",
			authenticate: false
		})
		.state("user", {
			url: "/user",
	    templateUrl: "app/user/user.html",
	    controller: "UserController",
			authenticate: false
    })
    .state("about", {
    	url: "/about",
    	templateUrl: "app/home/about.html",
    	authenticate: false
    });

	$urlRouterProvider.otherwise("/home");

	$httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {

  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('authentication');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !Auth.isAuth()){
          // User isn’t authenticated
          $state.transitionTo("home");
          event.preventDefault(); 
        }
    });
});
