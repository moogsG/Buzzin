//create Tables for Users, Maps, Points, and favourite maps


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('user_name');
      table.string('password');
      table.string('email');
    }),
    knex.schema.createTable('maps', (table) => {
      table.increments();
      table.string('user_id');
      table.string('map_name');
    }),
    knex.schema.createTable('points', (table) => {
      table.increments();
      table.string('user_id');
      table.string('map_id');
      table.string('title');
      table.string('description');
      table.string('image');
    }),
    knex.schema.createTable('fav_maps', (table) => {
      table.increments();
      table.string('user_id');
      table.string('map_id');
    })

  ])
};



exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('points'),
    knex.schema.dropTable('fav_maps'),
  ])
};