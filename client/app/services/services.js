app.factory("Listings", function($http){

  var sendAddress = function(cb){
    var address = document.getElementById('main-search-input').value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status) {
      if(status === google.maps.GeocoderStatus.OK) {
        cb(results[0]);
      } else {
        alert("please enter valid address yo");
      }
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

  var getListings = function(searchInput) {

    var address = addressParser(searchInput.formatted_address);
    var lat = searchInput.geometry.location.lat();
    var lng = searchInput.geometry.location.lng();

    return $http({
      method: "POST",
      url: "/api/search",
      data: { street: address[0],
              city: address[1],
              state: address[2],
              zip: address[3],
              lat: lat,
              lng: lng
            }
    })
    .then(function(resp) {
      return resp.data;
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
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var signup = function(user) {
    return $http ({
      method: "POST",
      url: "api/users/signup",
      data: user
    })
    .then(function(resp) {
      return resp.data.token;
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
});
