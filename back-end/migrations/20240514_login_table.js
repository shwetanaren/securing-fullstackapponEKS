export function up(knex) {
    return knex.schema.createTable('login', (table) => {
      table.increments('id').primary();             // Unique ID
      table.string('email').unique().notNullable(); // Login identifier
      table.string('hash').notNullable();           // Password hash
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('login');
  }