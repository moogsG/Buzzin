$(function() {
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
