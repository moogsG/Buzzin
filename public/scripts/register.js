$(function() {
  $('#registerBtn').on('click', function(event) {
    event.preventDefault();

    $('.login')
      .empty()
      .load('/users/register')
  });
  $('#loginBtn').on('click', function(event) {
    event.preventDefault();

    $('.login')
      .empty()
      .load('/users/login')
  });


  $('#login').on('click', function(event) {
    event.preventDefault();
    $.post('/users/login', $("form").serialize());
  });

  $('#register').on('click', function(event) {
    event.preventDefault();
    $.post('/users/register', $("form").serialize());
  });

})