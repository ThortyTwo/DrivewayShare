var app = angular.module("Driveway-Share", [
	"ui.router",
])

.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/home");

	$stateProvider
		.state("home", {
			url: "/home",
			templateUrl: "app/home/home.html",
			controller: "home"
		})
		.state("home.list", {
			url: "/list",
			templateUrl: "app/home/list.html",
      controller: "ListingsController"
		})
});


