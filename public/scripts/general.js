$(function(){
$('.hex').on('click', 'a', function(event) {
  var mapId = $(this).attr('mapId');
  $('.viewMap').empty();
  $('.viewMap').load('/maps/show/' + mapId);
});
})
