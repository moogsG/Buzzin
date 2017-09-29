exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', (table) => {
      table.string('map_description');
    }),
    knex.schema.table('points', (table) => {
      table.string('address');
    })
  ])

};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.table('maps', (table) => {
      table.dropColumn('map_description');
    }),
    knex.schema.table('points', (table) => {
      table.dropColumn('address');
    })
  ])

};