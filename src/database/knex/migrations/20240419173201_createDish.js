exports.up = (knex) => knex.schema.createTable("dishes", (table) => {
  table.increments('id').primary();

    table.text('name').notNullable();
    table.text('category').notNullable();
    table.float('price');

    table.text('description');
    table.text('photo');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

});

exports.down = (knex) => knex.schema.dropTable("dishes");
