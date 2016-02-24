app.factory("Listings", function($http){

	var getListings = function(searchInput) {
		return $http({
			method: "POST",
			url: "/api/search",
			data: {search: searchInput}
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	var postListing = function(listingInfo) {
		return $http({
			method: "POST",
			url: "/api/create",
			data: {listingInfo: listingInfo}
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	return {
		postListing: postListing,
		getListings: getListings
	}
})

.factory("Auth", function ($http, $location, $window) {

	var signin = function (user) {
		return $http ({
			method: "POST",
			url: "api/users/signin",
			data: user
		})
		.then(function (resp) {
			return resp.data.token;
		});
	};

	var signup = function (user) {
		return $http ({
			method: "POST",
			url: "api/users/signup",
			data: user
		})
		.then(function (resp) {
			return resp.data.token;
		});
	};

	var isAuth = function () {
		return !!$window.localStorage.getItem("authentication");
	}

	var isSigendIn = function () {
		return isAuth();
	}

	var signout = function () {
		$window.localStorage.removeItem("authentication");
		$location.path("/home");
	}


	return {
		signin: signin,
		signup: signup,
		isAuth: isAuth,
		isSigendIn: isSigendIn,
		signout: signout
	};
})


