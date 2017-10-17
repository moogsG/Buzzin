placeMarkers = function(point) {
  var content = '<div>' +
    '<h4>' + point.title + '</h4>' +
    '<p>' + point.description + '</p>' +
    '<img src="' + point.image + '" width="50px" height="50px"/>' +
    '<p>' + point.address + '</p>' +
    '</div>';
  geocoder.geocode({
    'address': point.address
  }, function(results, status) {
    if (status == 'OK') {
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      marker.info = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker, 'click', function() {
        marker.info.open(map, this);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

loadPoints = function(mapID) {
  $.get('/maps/' + mapID + '/point', function(data) {
    for (point of data) {
      placeMarkers(point);
    }
  });
}

curentLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};

var map,
  infoWindow,
  geocoder,
  markers = [];

function showMarkers() {
  setMapOnAll(map);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function clearMarkers() {
  setMapOnAll(null);
}
/*Functions for editing maps
 ****************************
 *
 */
/*Runs EDIT map*/

/*Creates Edit Map*/
function editMap(mapID) {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 51.044270,
      lng: -114.062019
    },
    zoom: 11,
    mapTypeId: 'roadmap'
  });

  //Adds marker on click and fills form with address
  google.maps.event.addListener(map, 'click', function(event) {
    deleteMarkers();
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      draggable: true
    });
    markers.push(marker);
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var address = results[0].formatted_address;
          $('#address').val(address);
        }
      }
    });
  })
  loadPoints(mapID);
  curentLocation(); //grabs current location
  /*Posts new point to DB
   ***********************
   */
  $('#newPoint').on('click', function(event) {

    event.preventDefault();
    $.post('/maps/newPoint/' + mapID, $('#editPoint').serialize());
    $('.modal-backdrop').removeClass("modal-backdrop");
    $('.viewMap').load('../maps/edit/' + mapID);
  });
}

/*Search places Function
 ************************
 *Needs to be able to clear search markers
 *Needs to be able to search locally
 */
function search() {
  infowindow = new google.maps.InfoWindow();

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    if (places.length == 0) {
      return;
    }
  });

  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    createPlaceMarker(place);

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
}

/*Creates marker for places search*/
function createPlaceMarker(place, address) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong><span id="placeName">' + place.name + '</span></strong><br>' +
      'Place ID: <span id="placeAddress">' +
      place.formatted_address + '</div>');
    infowindow.open(map, this);
  });
}

/*Screenshot Function
 **********************
 *Needs to add data to edit form
 */
function Screenshot(center) {
  var NewMapCenter = map.getCenter();
  var latitude = NewMapCenter.lat();
  var longitude = NewMapCenter.lng();
  var zoom = map.zoom;
  var image = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + "," + longitude + '&zoom=' + zoom + '&size=500x250'
}

/*Loads Map*/
$(function() {
  var mapID = $('#user').attr('mapId');
  $('.modalMapEdit').modal('show');
  $('.modal-backdrop').addClass("modal-backdrop");
  editMap(mapID);

});
