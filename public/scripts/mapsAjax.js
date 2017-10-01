$(function() {
  $('#newMapBtn').on('click', function(event) {
    event.preventDefault();

    $('.map')
      .empty()
      .load('/maps/new')
  });

  $('#newMap').on('click', function(event) {
    event.preventDefault();
    $.post('/maps/newMap', $('form').serialize());
  });

  $('#newPoint').on('click', function(event) {
    event.preventDefault();
    console.log('bitch')
    $.post('/maps/:id/newPoint', $("form").serialize());
  });

})
