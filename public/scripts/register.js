$(function() {
  $('#registerBtn').on('click', function(event) {
    event.preventDefault();

    $('#register')
      .load('/users/register')
  });

})
