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
      table.integer('user_id');
      table.string('map_name');
      table.string('map_description');
      table.string('map_image');
    }),
    knex.schema.createTable('points', (table) => {
      table.increments();
      table.integer('user_id');
      table.integer('map_id');
      table.string('title');
      table.string('description');
      table.string('image');
      table.string('address');
    }),
    knex.schema.createTable('fav_maps', (table) => {
      table.increments();
      table.integer('user_id');
      table.integer('map_id');
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
