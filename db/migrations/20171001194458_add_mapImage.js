exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', (table) => {
      table.string('map_image');
    }),
    knex.schema.table('maps', (table) => {
      table.dropColumn('user_id');
    })
  ])

};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.table('maps', (table) => {
      table.dropColumn('map_image');
    }),
    knex.schema.table('maps', (table) => {
      table.string('user_id');
    })
  ])

};