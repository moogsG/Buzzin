$(function() {
    $('.hex').on('click', 'a', function(event) {
        var mapId = $(this).attr('mapId');
        console.log(mapId)
        $('.viewMap').empty();
        $('.viewMap').load('../maps/show/' + mapId);
    })

    $('#mapsUser').on('click', function(event) {
        $('.maps').empty();
        $('.maps').load('../users/show');
    })
    $('#mapsFav').on('click', function(event) {
        $('.maps').empty();
        $('.viewMap').load('../users/fav');
    })
    $('#mapsEdited').on('click', function(event) {
        $('.maps').empty();
        $('.viewMap').load('../users/edited');
    })
})
