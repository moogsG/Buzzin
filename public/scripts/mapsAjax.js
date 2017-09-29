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

  $('#register').on('click', function(event) {
    event.preventDefault();
    $.post('/maps/edit', $("form").serialize());
  });

})
