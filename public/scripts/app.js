function createHexElement(map_name, map_d) {
    var $list = $("<li>").addClass("hex")
        .append($("<div>", {
            "class": "hexIn"
        }).append($("<a>", {
            "class": "hexLink"
        }).attr("href", "#").append($("<img>").attr("src", map)).append($("<h1>")
            .text(map_name).append($("<p>").text(description, user_name)))))

    return $list;
}


function select(id) {
    knex("maps").SELECT("map_name", "map_description").WHERE("user_id", id).then((res) => {
        for (let x in res) {
            createHexElement(res[x].map_name);
            createHexElement(res[x].map_description);
        }
    });
}
