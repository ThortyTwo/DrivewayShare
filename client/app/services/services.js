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
		console.log("made it to factory")
		return $http({
			method: "POST",
			url: "/api/create",
			data: {listingInfo: listingInfo}
		})
		.then(function(resp) {
			console.log("made it back to factory ", resp.data)
			return resp.data;
		});
	};

	return {
		postListing: postListing,
		getListings: getListings
	}
})