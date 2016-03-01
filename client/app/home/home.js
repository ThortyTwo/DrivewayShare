app.controller("HomeController", function($scope, Nav, Listings) {

	$scope.data = [];
	$scope.search = "";
  var prevSearch = $scope.search;
  $scope.distSearchInput = 2;
  $scope.listPopulated = false;
  $scope.mainSearch;

  Nav.setPage(1);

  $scope.autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById("main-search-input")),
    {types: ["geocode"]});

  var handleSearchResults = function(searchResult) {
    $scope.data = _.filter(searchResult, function(listing) {
      return listing.listing.available !== 0;
    });

    $scope.data.sort(function(itemA, itemB) {
      return itemA.dist - itemB.dist;
    });

    $scope.listPopulated = true;
    $scope.search = "";
    window.setTimeout(function() {
      $scope.displayMap();
    }, 10);
  }

  $scope.getSearch = function() {
    Listings.sendAddress("main-search-input", function(results) {
      prevSearch = results;
      $scope.mainSearch = {lat: results.lat, lng: results.lng};
      Listings.getListings(results, $scope.distSearchInput).then(function(searchResult) {
        handleSearchResults(searchResult);
      });
    });
  };

  $scope.sendEmail = function(email){
    var mail = 'mailto:' + email;
    window.location.href = mail;
  };

  $scope.toggleExpand = function(item) {
    item.expand = !item.expand;
  };

  $scope.sortDist = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.dist - itemB.dist;
    });
    $scope.displayMap();
  };

  $scope.sortPrice = function() {
    $scope.data.sort(function(itemA, itemB) {
      return itemA.listing.price - itemB.listing.price;
    });
    $scope.displayMap();
  };

  $scope.$watch("distSearchInput", _.throttle(function(){
    if($scope.listPopulated) {
      Listings.getListings(prevSearch, $scope.distSearchInput).then(function(searchResult) {
        handleSearchResults(searchResult);
      });
    }
  }, 800, {"leading": true, "trailing": true}));


  $scope.displayMap = function () {

    var markers = [];
    var markerIndex = 1;
    var infoWindowContent = [];

    for(var i = 0; i < $scope.data.length; i++) {
      var temp = [];
      temp.push(markerIndex.toString(), $scope.data[i].listing.latitude, $scope.data[i].listing.longitude);
      markers.push(temp);
      markerIndex++;
      infoWindowContent.push("$" + $scope.data[i].listing.price);
    }

    function initializeMap() {
      var mapProp = {
        center: {lat: $scope.mainSearch.lat, lng: $scope.mainSearch.lng},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("google-map"), mapProp);

      var mainSearchMarker = new google.maps.Marker({
        position: {lat: $scope.mainSearch.lat, lng: $scope.mainSearch.lng},
        map: map,
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      })

      var infoWindow = new google.maps.InfoWindow();
      var centerMarker = new google.maps.LatLng($scope.mainSearch.lat, $scope.mainSearch.lng);
      var bounds = new google.maps.LatLngBounds(centerMarker); 

      for(var j = 0; j < markers.length; j++) {
        var position = new google.maps.LatLng(markers[j][1], markers[j][2]);
        bounds.extend(position);
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          label: markers[j][0]
        });

        google.maps.event.addListener(marker, "click", (function(marker, j) {
          return function() {
            infoWindow.setContent(infoWindowContent[j]);
            infoWindow.open(map, marker);
          }
        })(marker, j));
      }

      map.fitBounds(bounds);
    }

    initializeMap();
  }
});
