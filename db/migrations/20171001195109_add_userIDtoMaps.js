exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('maps', (table) => {
      table.integer('user_id');
    })

  ]);
}


exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.table('maps', (table) => {
      table.integer('user_id');
    })

  ]);
}