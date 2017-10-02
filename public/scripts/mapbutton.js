$(function() {
    $('#create_map').on('click', function(event) {
        app.get('/maps/show/');
    });

    $('.hex').on('click', 'a', function(event) {
        var mapId = $(this).attr('mapId');
        console.log(mapId)
        $('.viewMap').empty();
        $('.viewMap').load('./maps/show/' + mapId);
    });
});
