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

	return {
		getListings : getListings
	}
})