/*Declares Global Vars*/

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
/*Functions for viewing maps
 ****************************
 *
 */

/*Creates main map*/
function initMap(mapID) {

  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 51.044270,
      lng: -114.062019
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  console.log("Map ID" + mapID)
  loadPoints(mapID);
  infoWindow = new google.maps.InfoWindow;
  curentLocation();
  $('#editMap').on('click', function(event) {
    $('.modal-backdrop').removeClass("modal-backdrop");
    $('.viewMap')
      .empty()
      .load('../maps/edit/' + mapID);
  })
}

/*Location Error handle*/
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

$(function() {

  $('#favoriteMap').on('click', function(event) {
    event.preventDefault();
    var mapID = $(this).attr('mapId');
    var user = $(this).attr('user');
    var values = {
      user_id: user,
      map_id: mapID
    }
    $.post('/users/favorite', values)
      .done(function() {
        $('#favoriteMap').removeClass('btn-primary').addClass('btn-danger');
      })
      .fail(function() {});
  });
  /*Doc load
**********
Loads the map
*/

  var mapID = $('#map').attr('mapId');
  $('.modalMap').modal();
  initMap(mapID);

});
