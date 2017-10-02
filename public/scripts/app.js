
// const knex = require('knex')(require('../../knexfile').connection);



function createHexElement(map_name, map_description, user_name) {
  var $list = $("<li>").addClass("hex")
    .append($("<div>", {
      "class": "hexIn"
    }).append($("<a>", {
      "class": "hexLink"
    }).attr("href", "#").append($("<img>").attr("src", map)).append($("<h1>")
      .text(map_name).append($("<p>").text(map_description, user_name)))))

  return $list;
}


function get_map(users) {
  knex('users').select('map_name', 'map_description', 'user_name')
    .innerJoin('maps', 'users.id', 'maps.user_id').where({
      user_id: users
    })
    .asCallback(function(err, values) {
      if (err) {
        console.log(err);
      } else {
        // for(let x in values)
        // $('.hexGrid').prepend(createHexElement(values[0].map_name, values[0].map_description, values[0].user_name));
        console.log(values);
      }

    });

}

get_map(2);
