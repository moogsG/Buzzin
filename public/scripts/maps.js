$(function() {

  $('ul')
    .empty()
    .load('/maps')
})
    $('#showMaps').on('click', function(event) {
        event.preventDefault();
    var iconBase = '/images/marker.png';


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('geolocation not supported');
    }

    function success(position) {
        initMap(position.coords.latitude, position.coords.longitude);
    }

    function error(msg) {
        alert('error: ' + msg);
    }

    function initMap(latitude, longitude) {
        var CurrentPosition = { lat: latitude, lng: longitude };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: CurrentPosition
        });
        var marker = new google.maps.Marker({
            position: CurrentPosition,
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker, 'dragend', function(marker) {
            var latLng = marker.latLng;
            currentLatitude = latLng.lat();
            currentLongitude = latLng.lng();
            jQ("#latitude").val(currentLatitude);
            jQ("#longitude").val(currentLongitude);
        });

        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
            $('#map').append('<div>').addClass("floating")
        });

        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: iconBase,
                draggable: true
            });
        }



    }
})

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

