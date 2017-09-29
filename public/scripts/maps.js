$(function() {
    $('#showMaps').on('click', function(event) {
        event.preventDefault();

        $('.map')
            .empty()
            .load('/maps/show')
            .then(initMap());

    });

});

var map, infoWindow;
var geocoder;
var markers = [];


//Creates map


function initMap() {
    geocoder = new google.maps.Geocoder();
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 10,
        mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow;
    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {

        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        markers.push(marker);
        /*  google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.description + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);
          });*/

        google.maps.event.addListener(marker, 'click', function() {
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
            infowindow.open(map, this);
        });
    })
    $('#editMap').on('click', function(event) {
        event.preventDefault();
        var mapID = $(this).attr('dataID');
        $('.map').empty();
        editMap(mapID);
        console.log('msg');
    });
    curentLocation();
}

function editMap(mapID) {
    geocoder = new google.maps.Geocoder();
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    infoWindow = new google.maps.InfoWindow;
    messagewindow = new google.maps.InfoWindow({
        content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {

        marker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        markers.push(marker);
        /*  google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.description + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);
          });*/

        google.maps.event.addListener(marker, 'click', function() {
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
            infowindow.open(map, this);
        });
    })

    curentLocation();
}

function showMarkers() {
    setMapOnAll(map);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function editMarker() {
    $('#name').val($('#placeName').text());
    $('#address').val($('#placeAddress').text());
}

function curentLocation() {
    // Centers on Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

};
/*Codes address and adds marker
 ******************************
 */
function codeAddress() {

    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: "Hello World!",
                draggable: true,

            });


        } else {}
    });
};



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

    var markers = [];



    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        createMarker(place);

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    map.fitBounds(bounds);
}

function createMarker(place) {
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





function saveData() {
    var name = escape(document.getElementById('name').value);
    var address = escape(document.getElementById('address').value);
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
        '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

    downloadUrl(url, function(data, responseCode) {

        if (responseCode == 200 && data.length <= 1) {
            infowindow.close();
            messagewindow.open(map, marker);
        }
    });
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request.responseText, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);

}



function Screenshot(center) {

    var NewMapCenter = map.getCenter();
    var latitude = NewMapCenter.lat();
    var longitude = NewMapCenter.lng();
    var zoom = map.zoom

    var image = 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + "," + longitude + '&zoom=' + zoom + '&size=500x250'

    //document.getElementById('hex').style.backgroundImage = "url(" + image + ")";
}