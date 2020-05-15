exports.up = function (knex) {
  // create a users table
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.string("lastName").index()
    table.string("firstName").index()
    table.string("ghUser").notNullable().index()
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  // delete the users table
  return knex.schema.dropTableIfExists("users")
}

exports.down = function (knex) {}
