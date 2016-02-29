app.factory("Listings", function($http, $window){

  var sendAddress = function(element_id, cb){
    var address = document.getElementById(element_id).value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        var retVal = {};
        retVal.address = addressParser(results[0].formatted_address);
        retVal.lat = results[0].geometry.location.lat();
        retVal.lng = results[0].geometry.location.lng();
        cb(retVal);
      } else {
        alert("Please enter a valid address...");
      }
    });
  };

  var postListing = function(listingInfo) {

    return $http({
      method: "POST",
      url: "/api/create",
      data: { street: listingInfo.address[0],
              city: listingInfo.address[1],
              state: listingInfo.address[2],
              zip: listingInfo.address[3],
              lat: listingInfo.lat,
              lng: listingInfo.lng,
              price: listingInfo.price,
              description: listingInfo.descrip,
              token: $window.localStorage.getItem("authentication")
            }
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getListings = function(searchInput, maxDist) {

    return $http({
      method: "POST",
      url: "/api/search",
      data: { street: searchInput.address[0],
              city: searchInput.address[1],
              state: searchInput.address[2],
              zip: searchInput.address[3],
              lat: searchInput.lat,
              lng: searchInput.lng,
              maxDist: maxDist
            }
    })
    .then(function(res) {
      return res.data;
    });
  };

  var getUserListings = function() {
    return $http({
      method: "POST",
      url: "/api/userListing",
      data: {token: $window.localStorage.getItem("authentication")}
    }).then(function(res) {
      return res.data;
    });
  };

  var deleteListing = function(listingId) {
    return $http({
      method: "POST",
      url: "/api/delete",
      data: {listingId: listingId}
    }).then(function(res) {
      return res.data;
    });
  };

  var toggleListingAvailability = function(listingId, avail) {
    return $http({
      method: "POST",
      url: "/api/toggle",
      data: { listingId: listingId,
              avail: avail
            }
    }).then(function(res) {
      return res.data;
    });
  };

  var addressParser = function(address) {
    var arr = [];
    var commas = address.split(",");
    arr[0] = commas[0].trim();
    arr[1] = commas[1].trim();
    var cz = commas[2].trim().split(" ");
    arr[2] = cz[0].trim();
    arr[3] = cz[1].trim();
    return arr;
  };

  return {
    postListing: postListing,
    getListings: getListings,
    getUserListings: getUserListings,
    deleteListing: deleteListing,
    toggleListingAvailability: toggleListingAvailability,
    sendAddress: sendAddress
  };
})
.factory("Auth", function($http, $location, $window) {

  var signin = function(user) {
    return $http ({
      method: "POST",
      url: "api/users/signin",
      data: user
    })
    .then(function(res) {
      return res.data.token;
    });
  };

  var signup = function(user) {
    return $http ({
      method: "POST",
      url: "api/users/signup",
      data: user
    })
    .then(function(res) {
      return res.data.token;
    });
  };

  var isAuth = function() {
    return !!$window.localStorage.getItem("authentication");
  }

  var isSignedIn = function() {
    return isAuth();
  }

  var signout = function() {
    $window.localStorage.removeItem("authentication");
    $location.path("/home");
  }

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    isSignedIn: isSignedIn,
    signout: signout
  };
})
.service("Nav", function(){
  var page = 1;

  var getPage = function(){
    return page;
  };

  var setPage = function(val){
    page = val;
  };

  return {
    getPage: getPage,
    setPage: setPage
  };

});
